import { signUpSchema } from "$lib/schemas"
import { redirect } from "@sveltejs/kit"
import { fail, setError, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = async ({ locals: { safeGetSession } }) => {
  const { user } = await safeGetSession()

  // If user is already authenticated (not anonymous), redirect to dashboard
  if (user && !user.is_anonymous) {
    return redirect(300, "/find-env")
  }

  const form = await superValidate(zod(signUpSchema))

  return { form }
}

export const actions = {
  default: async ({ request, locals: { supabase }, url }) => {
    const form = await superValidate(request, zod(signUpSchema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { error: userError } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
        data: {
          hasPassword: true,
        },
      },
    })

    if (userError) {
      console.error({ userError })

      if (userError.message.includes("already registered")) {
        return setError(form, "Email already registered. Try signing in instead.", { status: 400 })
      }

      return setError(form, "Something went wrong...", { status: 500 })
    }

    redirect(300, `/login/confirm?email=${form.data.email}`)
  },
}

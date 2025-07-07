import { setError, superValidate } from "sveltekit-superforms/server"
import { zod } from "sveltekit-superforms/adapters"

import { environmentSchema } from "$lib/schemas"
import { fail, redirect } from "@sveltejs/kit"
import type { PostgrestError } from "@supabase/supabase-js"

export const load = async ({ locals: { safeGetSession }, url }) => {
  const { user } = await safeGetSession()
  
  // Redirect anonymous users to login
  if (!user?.id || user.is_anonymous) {
    const redirectTo = url.pathname + url.search
    throw redirect(302, `/login/sign_up?redirectTo=${encodeURIComponent(redirectTo)}`)
  }

  const form = await superValidate(zod(environmentSchema))
  return { form }
}

export const actions = {
  default: async ({
    locals: { safeGetSession, supabaseServiceRole },
    request,
  }) => {
    const { user } = await safeGetSession()
    const form = await superValidate(request, zod(environmentSchema))

    if (!form.valid) {
      return fail(400, { form, env: null })
    }

    // Ensure user exists and has a valid ID
    if (!user?.id || user.is_anonymous) {
      return setError(form, "Please sign in to create an environment", { status: 401 })
    }

    const slug = form.data.name.trim().toLowerCase().split(" ").join("-")

    try {
      // Check if profile exists, create if not
      let { error: profileError, data: profile } = await supabaseServiceRole
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single()

      if (profileError?.code === "PGRST116") {
        // Profile doesn't exist, create it
        const { error: createError, data: newProfile } = await supabaseServiceRole
          .from("profiles")
          .insert({ id: user.id })
          .select("id")
          .single()

        if (createError) {
          throw createError
        }
        profile = newProfile
      } else if (profileError) {
        throw profileError
      }

      const { error: envError, data: env } = await supabaseServiceRole
        .from("environments")
        .insert({
          ...form.data,
          slug,
        })
        .select("*")
        .single()

      if (envError) {
        throw envError
      }

      await supabaseServiceRole
        .from("environments_profiles")
        .insert({ environment_id: env?.id, profile_id: profile?.id })

      return { form, env }
    } catch (err) {
      const error = err as PostgrestError
      console.log(err)

      if (error.code === "23505") {
        return setError(form, "Environment name already taken", { status: 403 })
      }
      return setError(form, "Something went wrong", { status: 500 })
    }
  },
}

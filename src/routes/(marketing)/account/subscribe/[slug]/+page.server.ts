import { redirect } from "@sveltejs/kit"

export const load = async ({ locals, params }) => {
  if (locals.environment) {
    return redirect(307, `/dashboard/${locals.environment.slug}/subscribe/${params.slug}`)
  }

  redirect(307, "/onboarding")
}

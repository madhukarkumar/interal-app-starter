import { redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  if (locals.environment) {
    return redirect(307, `/dashboard/${locals.environment.slug}/billing`)
  }

  redirect(307, "/onboarding")
}

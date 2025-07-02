import { redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  if (locals.environment) {
    return redirect(307, `/dashboard/${locals.environment.slug}/api`)
  }

  redirect(307, "/onboarding")
}

export const actions = {
  updateProfile: async ({ locals, request }) => {
    if (locals.environment) {
      // Redirect the form action to the proper dashboard route
      const formData = await request.formData()
      const url = `/dashboard/${locals.environment.slug}/api`
      
      // We need to forward this to the actual API endpoint
      // For now, just redirect to the dashboard
      return redirect(307, `/dashboard/${locals.environment.slug}`)
    }

    return redirect(307, "/onboarding")
  }
}

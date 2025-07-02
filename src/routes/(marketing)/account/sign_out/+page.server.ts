import { redirect } from "@sveltejs/kit"

export const load = async () => {
  // Redirect to the main sign out route
  redirect(307, "/sign_out")
}

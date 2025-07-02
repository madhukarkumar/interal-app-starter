<script lang="ts">
  import { Menu } from "lucide-svelte"
  import { Button, buttonVariants } from "$lib/components/ui/button"
  import * as DropDownMenu from "$lib/components/ui/dropdown-menu"
  import { getEnvironmentState } from "$lib/states/environment.svelte"

  import { WebsiteName } from "$lib/config"

  let { data, children } = $props()
  const environment = getEnvironmentState()
</script>

<div class="navbar bg-base-100 shadow-lg border-b border-base-200 container mx-auto rounded-box mt-2">
  <div class="flex-1">
    <Button variant="ghost" href="/" class="text-lg">
      {WebsiteName}
    </Button>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 hidden sm:flex font-medium">
      <li class="md:mx-2">
        <a href="/pricing" class={buttonVariants({ variant: "ghost" })}
          >Pricing</a
        >
      </li>
      {#if !data.auth.user || data.auth.user?.is_anonymous}
        <li class="md:mx-2">
          <a href="/login" class={buttonVariants({ variant: "ghost" })}
            >Sign In</a
          >
        </li>
      {:else}
        <li class="md:mx-2">
          <a href="/sign_out" class={buttonVariants({ variant: "ghost" })}
            >Sign Out</a
          >
        </li>
      {/if}
      <li class="md:mx-2">
        {#if !environment.value}
          <a
            href="/onboarding"
            class={buttonVariants({ variant: "secondary" })}
          >
            Get Started
          </a>
        {:else}
          <a
            href="/dashboard/{environment.value.slug}"
            class={buttonVariants({ variant: "secondary" })}
          >
            Dashboard
          </a>
        {/if}
      </li>
    </ul>

    <div class="sm:hidden">
      <DropDownMenu.Root>
        <DropDownMenu.Trigger asChild let:builder>
          <Button builders={[builder]}><Menu /></Button>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content class="w-56 sm:hidden">
          <DropDownMenu.Item class="md:mx-2">
            <a href="/pricing" class="w-full">Pricing</a>
          </DropDownMenu.Item>
          {#if !data.auth.user || data.auth.user?.is_anonymous}
            <DropDownMenu.Item class="md:mx-2">
              <a href="/login">Sign In</a>
            </DropDownMenu.Item>
          {:else}
            <DropDownMenu.Item class="md:mx-2">
              <a href="/sign_out" class="w-full">Sign Out</a>
            </DropDownMenu.Item>
          {/if}
          <DropDownMenu.Item class="md:mx-2">
            {#if !environment.value}
              <a href="/onboarding" class="w-full"> Get Started </a>
            {:else}
              <a href="/dashboard/{environment.value.slug}" class="w-full">
                Dashboard
              </a>
            {/if}
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu.Root>
    </div>
  </div>
</div>

<div class="">
  {@render children()}
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="flex-grow"></div>
<div class="">
  <div class="border-t max-w-[1000px] mx-auto"></div>
  <footer class="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
    <nav class="grid grid-flow-col gap-4">
      <a class="link link-hover" href="/">Overview</a>
      <a class="link link-hover" href="/pricing">Pricing</a>
      <a class="link link-hover" href="/blog">Blog</a>
      <a class="link link-hover" href="/contact_us">Contact Us</a>
    </nav>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a href="https://github.com/madhukarkumar/saas-starter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current">
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current">
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current">
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </nav>
    <aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </aside>
  </footer>
</div>

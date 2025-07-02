<script lang="ts">
  import { invalidate } from "$app/navigation"

  import * as Alert from "$lib/components/ui/alert"
  import { onMount } from "svelte"

  onMount(async () => {
    invalidate("data:init")
  })
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-8 text-foreground px-1">Dashboard</h1>

<div class="bg-gray-50 border border-gray-200 px-1 py-8 mb-8">
  <div class="text-center">
    <h1 class="text-3xl font-bold text-foreground mb-4">Welcome!</h1>
    <p class="text-lg text-foreground mb-6 px-1">
      Welcome to your pair product marketer agent. We will add more functionality here.
    </p>
    <div class="flex justify-center gap-4">
      <span class="bg-blue-600 text-white px-3 py-1 text-sm">AI-Powered</span>
      <span class="bg-pink-600 text-white px-3 py-1 text-sm">Product Marketing</span>
    </div>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-white border border-gray-200 px-1 py-4">
    <div class="px-1">
      <h2 class="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Smart Insights
      </h2>
      <p class="text-foreground">Get AI-powered product marketing insights and recommendations.</p>
    </div>
  </div>
  
  <div class="bg-white border border-gray-200 px-1 py-4">
    <div class="px-1">
      <h2 class="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Quick Actions
      </h2>
      <p class="text-foreground">Access powerful marketing tools and automation features.</p>
    </div>
  </div>
  
  <div class="bg-white border border-gray-200 px-1 py-4">
    <div class="px-1">
      <h2 class="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Analytics
      </h2>
      <p class="text-foreground">Monitor performance and track your marketing success.</p>
    </div>
  </div>
</div>

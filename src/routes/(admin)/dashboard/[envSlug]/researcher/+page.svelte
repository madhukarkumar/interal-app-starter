<script lang="ts">
  import { writable } from "svelte/store"
  import { page } from "$app/stores"

  interface Message {
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }

  const messages = writable<Message[]>([])
  let input = ""
  let isLoading = false

  async function sendMessage() {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    input = ""
    isLoading = true

    // Add user message to chat
    messages.update((msgs) => [
      ...msgs,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ])

    try {
      const response = await fetch(
        `/dashboard/${$page.params.envSlug}/researcher`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Add assistant response to chat
      messages.update((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      messages.update((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content:
            "I apologize, but an error occurred while processing your request. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      isLoading = false
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }
</script>

<svelte:head>
  <title>Company Researcher - AI Agent</title>
</svelte:head>

<div class="container mx-auto p-6 max-w-4xl">
  <div class="mb-6">
    <h1 class="text-3xl font-bold mb-2">Company Researcher Agent</h1>
    <p class="text-base-content/70">
      Get comprehensive company research reports powered by AI and real-time web data.
    </p>
  </div>

  <!-- Chat Messages -->
  <div class="bg-base-200 rounded-lg p-4 mb-6 h-96 overflow-y-auto">
    {#each $messages as message}
      <div
        class="chat {message.role === 'user' ? 'chat-end' : 'chat-start'} mb-4"
      >
        <div class="chat-image avatar">
          <div
            class="w-10 rounded-full {message.role === 'user'
              ? 'bg-primary'
              : 'bg-secondary'}"
          >
            <div
              class="w-full h-full flex items-center justify-center text-white font-bold"
            >
              {message.role === "user" ? "U" : "A"}
            </div>
          </div>
        </div>
        <div class="chat-header">
          {message.role === "user" ? "You" : "Company Researcher"}
          <time class="text-xs opacity-50 ml-2">
            {message.timestamp.toLocaleTimeString()}
          </time>
        </div>
        <div
          class="chat-bubble {message.role === 'user'
            ? 'chat-bubble-primary'
            : 'chat-bubble-secondary'}"
        >
          {message.content}
        </div>
      </div>
    {/each}

    {#if isLoading}
      <div class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full bg-secondary">
            <div
              class="w-full h-full flex items-center justify-center text-white font-bold"
            >
              A
            </div>
          </div>
        </div>
        <div class="chat-header">Company Researcher</div>
        <div class="chat-bubble chat-bubble-secondary">
          <span class="loading loading-dots loading-sm"></span>
        </div>
      </div>
    {/if}
  </div>

  <!-- Input Area -->
  <div class="flex gap-2">
    <textarea
      bind:value={input}
      on:keydown={handleKeyDown}
      placeholder="Ask about companies, markets, or business intelligence..."
      class="textarea textarea-bordered flex-1 resize-none"
      rows="3"
      disabled={isLoading}
    ></textarea>
    <button
      on:click={sendMessage}
      disabled={!input.trim() || isLoading}
      class="btn btn-primary min-w-24"
    >
      {#if isLoading}
        <span class="loading loading-spinner loading-sm"></span>
      {:else}
        Send
      {/if}
    </button>
  </div>

  <!-- Usage Guide -->
  <div class="mt-6 p-4 bg-base-300 rounded-lg">
    <h3 class="font-semibold mb-2">How to use:</h3>
    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>Ask questions about companies, markets, or business topics</li>
      <li>
        Try asking about company research, industry analysis, or business
        intelligence
      </li>
    </ul>
  </div>
</div>

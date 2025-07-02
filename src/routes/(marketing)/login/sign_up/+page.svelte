<script lang="ts">
  import * as Form from "$lib/components/ui/form"
  import * as Card from "$lib/components/ui/card"
  import { superForm } from "sveltekit-superforms"
  import { zodClient } from "sveltekit-superforms/adapters"
  import { signUpSchema } from "$lib/schemas"
  import { Input } from "$lib/components/ui/input"
  import { Button } from "$lib/components/ui/button"

  let { data } = $props()



  const form = superForm(data.form, {
    validators: zodClient(signUpSchema),
  })

  const { form: formData, enhance, delayed, errors, constraints } = form
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>

<Card.Root class="mt-6">
  <Card.Header>
    <Card.Title class="text-2xl font-bold text-center">Sign Up</Card.Title>
  </Card.Header>
  <Card.Content>
    <form method="post" use:enhance class="grid gap-4">
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email</Form.Label>
          <Input
            bind:value={$formData.email}
            {...attrs}
            {...$constraints.email}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input
            bind:value={$formData.password}
            type="password"
            {...attrs}
            {...$constraints.password}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="confirmPassword">
        <Form.Control let:attrs>
          <Form.Label>Confirm Password</Form.Label>
          <Input
            bind:value={$formData.confirmPassword}
            type="password"
            {...attrs}
            {...$constraints.confirmPassword}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      {#if $errors._errors}
        <p class="text-destructive text-sm font-bold mt-1">
          {$errors._errors[0]}
        </p>
      {/if}

      <Button type="submit" disabled={$delayed} class="w-full">
        {#if $delayed}
          ...
        {:else}
          Sign Up
        {/if}
      </Button>
    </form>
  </Card.Content>

  <Card.Footer>
    <div class="mt-4 mb-2">
      Have an account? <a class="underline" href="/login/sign_in">Sign in</a>.
    </div>
  </Card.Footer>
</Card.Root>

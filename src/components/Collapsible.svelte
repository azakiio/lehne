<script>
  import { slide } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  let isOpen = false;
</script>

<div>
  <button on:click={() => (isOpen = !isOpen)} class="w-full">
    <slot name="trigger" />
  </button>

  {#if isOpen}
    <div transition:slide={{ duration: 500, easing: cubicInOut }}>
      <slot />
    </div>
  {/if}
</div>

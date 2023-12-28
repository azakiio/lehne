<script>
  import Moon from "~/icons/Moon.svelte";
  import Sun from "~/icons/Sun.svelte";

  const rootEl =
    typeof document !== "undefined" ? document.documentElement : null;
  const themes = ["light", "dark"];
  let theme = "";

  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  } else if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  }

  function handleChange(event) {
    theme = event.target.value;
    localStorage.setItem("theme", theme);
  }

  $: if (rootEl && theme === "light") {
    rootEl.classList.remove("theme-dark");
  } else if (rootEl && theme === "dark") {
    rootEl.classList.add("theme-dark");
  }
</script>

<div class="theme-toggle">
  <label>
    {#if theme === "dark"}
      <Sun />
      <input
        type="radio"
        name="theme-toggle"
        checked={theme === "light"}
        value={"light"}
        title={`Use light theme`}
        aria-label={`Use light theme`}
        on:change={handleChange}
      />
    {:else}
      <Moon />
      <input
        type="radio"
        name="theme-toggle"
        checked={theme === "dark"}
        value="dark"
        title={`Use dark theme`}
        aria-label={`Use dark theme`}
        on:change={handleChange}
      />
    {/if}
  </label>
</div>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    height: 100%;
    border-radius: 99em;
    background-color: var(--theme-code-inline-bg);
  }

  .theme-toggle > label:focus-within {
    outline: 2px solid transparent;
    box-shadow:
      0 0 0 0.08em var(--theme-accent),
      0 0 0 0.12em white;
  }

  .theme-toggle > label {
    color: var(--theme-code-inline-text);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  input[name="theme-toggle"] {
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
</style>

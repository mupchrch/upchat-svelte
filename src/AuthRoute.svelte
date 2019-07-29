<script>
  import { navigate } from "svelte-routing";
  import { onMount, beforeUpdate, tick } from "svelte";
  import Token from "./token";

  export let param;
  export let childComponent;

  let renderSlot = false; // prevent slot from rendering until we evaluate the token

  onMount(async () => {
    if (!Token.get() || Token.isExpired()) {
      // protect route
      await tick();
      navigate("/login", { replace: true });
    } else {
      renderSlot = true;
    }
  });
</script>

{#if renderSlot}
  <svelte:component this={childComponent} {param} />
{/if}
<svelte:head>
  <title>upchat • chat • {param}</title>
</svelte:head>

<script>
  import Chat from "../components/Chat.svelte";

  export let param; // the team name
</script>

<Chat teamName={param} />
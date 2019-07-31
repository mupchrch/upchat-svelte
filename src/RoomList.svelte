<script>
  export let header = "";
  export let rooms = {};
</script>

<h2>{header}</h2>
<ul>
  {#each Object.values(rooms) as room}
  <li>{room.name}</li>
  {/each}
</ul>
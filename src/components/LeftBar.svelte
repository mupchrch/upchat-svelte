<script>
  import RoomList from "./RoomList.svelte";

  export let roomsByType = {};
</script>

<RoomList header="Channels" rooms={roomsByType.public} />
<RoomList header="Direct Messages" rooms={roomsByType.direct} />
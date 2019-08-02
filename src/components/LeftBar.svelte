<script>
  import RoomList from "./RoomList.svelte";

  export let rooms = {};
</script>

<RoomList header="Channels" rooms={rooms.public} />
<RoomList header="Direct Messages" rooms={rooms.direct} />
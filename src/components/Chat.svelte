<svelte:head>
  <title>upchat • chat • {teamName}</title>
</svelte:head>

<script>
  import { onMount } from "svelte";
  import Api from "../api";
  import LeftBar from "./LeftBar.svelte";

  export let teamName;

  let rooms = {};

  /**
   * Gets the team object of the team that the user is currently attempting to view.
   * 
   * @return A team object.
   * @throws {Error} if team does not exist (or user is not a member of this team).
   */
  function getAuthorizedTeam(teamName, teams) {
    const team = teams.find((team) => team.name === teamName);

    if (!team) {
      throw new Error(`Team ${teamName} does not exist.`);
    }

    return team;
  }

  onMount(async () => {
    try {
      let teams = await Api.fetchTeams();
      teams = Object.values({...teams.public, ...teams.private});
      // Make sure our user belongs to this team.
      const team = getAuthorizedTeam(teamName, teams);
  
      rooms = await Api.fetchRooms(team.team_id);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        console.log(e.error); // message from server
      }
    }
  });
</script>

<h1>This is the chat page for {teamName}!</h1>
<LeftBar {rooms} />
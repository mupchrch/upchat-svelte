<svelte:head>
  <title>upchat • chat • {teamName}</title>
</svelte:head>

<script>
  import { onMount } from "svelte";
  import Ajax from "../ajax";
  import LeftBar from "./LeftBar.svelte";

  export let teamName;

  let allTeamsForUser = [];
  let roomsByType = {};

  /**
   * Fetches the user's teams from the server.
   */
  async function fetchTeams() {
    const resJson = await Ajax.get('http://localhost:8000/api/team/get-teams', {});

    return Object.values(Object.assign(resJson.public, resJson.private));;
  }

  /**
   * Fetches the user's rooms from the server.
   * 
   * @return The rooms, grouped by room type.
   */
  async function fetchRooms(teamId) {
    const resJson = await Ajax.get('http://localhost:8000/api/room/get-rooms', { team_id: teamId });

    return { public: resJson.public, direct: resJson.direct };
  }

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
      allTeamsForUser = await fetchTeams();
      // Make sure our user belongs to this team.
      const team = getAuthorizedTeam(teamName, allTeamsForUser);
  
      roomsByType = await fetchRooms(team.team_id);
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
<LeftBar {roomsByType} />
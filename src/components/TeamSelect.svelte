<svelte:head>
  <title>upchat • teams</title>
</svelte:head>

<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Ajax from "../ajax";

  let teams = {};

  async function fetchTeams() {
    const resJson = await Ajax.get('http://localhost:8000/api/team/get-teams', {});

    return Object.assign(resJson.public, resJson.private);
  }

  onMount(async () => {
    teams = await fetchTeams();
  });
</script>

<h1>This is the team select page!</h1>

<ul>
{#each Object.values(teams) as team}
  <li>
    <Link to="/chat/{team.name}">{team.name}</Link>
  </li>
{/each}
</ul>
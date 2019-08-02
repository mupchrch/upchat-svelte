<svelte:head>
  <title>upchat • teams</title>
</svelte:head>

<script>
  import { onMount } from "svelte";
  import { Link, navigate } from "svelte-routing";
  import Api from "../api";

  let teams = {};

  onMount(async () => {
    teams = await Api.fetchTeams();
    teams = {...teams.public, ...teams.private};
  });

  /**
   * Joins user to a team and navigates to that team's chat.
   * @param teamId
   */
  async function joinTeam(teamId) {
    try {
      const team = await Api.joinTeam(teamId);

      // mark the user as joined
      teams[team.team_id].user_id = team.user_id;
      navigate(`/chat/${teams[team.team_id].name}`);
    } catch (err) {
      alert('error joining team');
    }
  }
</script>

<style>
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 14px;
    justify-items: center;
  }

  li {
    border-radius: 5px;
    width: 66%;
    background-color: rgba(0, 0, 0, .1);
    transition: background-color .15s;
    cursor: pointer;
  }

  li:hover {
    background-color: rgba(0, 0, 0, .2);
  }

  .team-card {
    text-align: center;
    padding: 10px;
    position: relative;
  }

  .team-card i {
    margin-bottom: 10px;
  }

  .team-info {
    position: absolute;
    right: 6px;
    top: 6px;
  }

  .add-team {
    font-style: italic;
  }
</style>

<h1>This is the team select page!</h1>

<div class="entrance-flow">
  <div class="entrance-flow-box team-select">
    <h1>Teams</h1>
    <ul>
      {#each Object.values(teams) as team}
        {#if team.user_id}
          <li>
            <Link to="/chat/{team.name}" getProps={() => ({ title: "View team chat" })}>
              <div class="team-card">
                {#if team.type === "private"}
                  <i class="fas fa-key team-info" title="Private team"></i>
                {/if}
                <i class="fas fa-door-open fa-2x"></i>
                <div>{team.name}</div>
              </div>
            </Link>
          </li>
        {:else}
          <li on:click={() => joinTeam(team.team_id)} title="Join team" tabIndex="0">
            <div class="team-card">
              <i class="fas fa-door-closed fa-2x"></i>
              <div>{team.name}</div>
            </div>
          </li>
        {/if}
      {/each}
      <li>
        <Link to="/createteam" getProps={() => ({ title: 'Create a new team' })}>
          <div class="team-card add-team">
            <i class="fas fa-plus fa-2x"></i>
            <div>Create a team.</div>
          </div>
        </Link>
      </li>
    </ul>
  </div>
</div>
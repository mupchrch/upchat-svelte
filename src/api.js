import Ajax from "./ajax";

/**
 * Authenticates a user based on username and password.
 * @param username
 * @param password
 * 
 * @return {string} an authentication token
 */
async function authenticate(username, password) {
  const resJson = await Ajax.post("http://localhost:8000/api/auth/authenticate", {
    username,
    password
  });

  return resJson.token;
}

/**
 * Fetches the user's teams from the server.
 * 
 * @return {Array}
 */
async function fetchTeams() {
  return await Ajax.get('http://localhost:8000/api/team/get-teams', {});
}

/**
 * Joins a user to a team.
 * @param teamId
 * 
 * @return {Object} newly joined team
 */
async function joinTeam(teamId) {
  const resJson = await Ajax.post('http://localhost:8000/api/team/join-team', { team_id: teamId });

  return resJson.team_member;
}

/**
 * Fetches the user's rooms from the server.
 * 
 * @return The rooms, grouped by room type.
 */
async function fetchRooms(teamId) {
  return await Ajax.get('http://localhost:8000/api/room/get-rooms', { team_id: teamId });
}

export default {
  authenticate,
  fetchTeams,
  joinTeam,
  fetchRooms
};
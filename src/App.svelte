<script>
	import { Router, Link, Route } from "svelte-routing";
	import AuthRoute from "./AuthRoute.svelte";
	import HomePage from "./routes/Home.svelte";
	import LoginPage from "./routes/Login.svelte";
	import TeamSelectPage from "./routes/TeamSelect.svelte";
	import ChatPage from "./routes/Chat.svelte";

	export let url = "";
</script>

<Router url="{url}">
	<nav>
		<Link to="/">Home</Link>
		<Link to="login">Login</Link>
		<Link to="teams">Teams</Link>
	</nav>
	<div>
		<Route path="/"><HomePage /></Route>
		<Route path="login"><LoginPage /></Route>
		<Route path="teams" component={AuthRoute} childComponent={TeamSelectPage} />
		<Route path="chat/:param" component={AuthRoute} childComponent={ChatPage} />
	</div>
</Router>
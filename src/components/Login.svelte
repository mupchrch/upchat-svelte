<script>
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import EntranceFlow from "./EntranceFlow.svelte";
	import Api from "../api";
  import Token from "../token";

	let username = "";
	let password = "";
	let errorMessage = "";

	/**
	 * Authenticates a user and navigates to teams page.
	 */
	async function authenticate() {
		try {
			const token = await Api.authenticate(username, password);

			Token.set(token);
			Token.enableAutoRefresh();
			navigate("/teams");
		} catch (e) {
			errorMessage = e.error ? e.error : "Something went wrong.";
		}
	}

	onMount(() => {
		if (Token.get() && !Token.isExpired()) {
			// auto log in
			navigate("/teams", { replace: true });
		}
	});
</script>

<h1>This is the login page, {username || "stranger"}!</h1>
<EntranceFlow>
	<form className="entrance-flow-box" on:submit|preventDefault={authenticate}>
		{errorMessage}
		<div className="form-row">
			<i className="fas fa-fw fa-user"></i>
			<input
				type="text"
				name="username"
				placeholder="username"
				bind:value={username}
			/>
		</div>
		<div className="form-row">
			<i className="fas fa-fw fa-key"></i>
			<input
				type="password"
				name="password"
				placeholder="password"
				bind:value={password}
			/>
		</div>
		<div className="form-row">
			<input type="submit" value="log in"/>
		</div>
	</form>
</EntranceFlow>
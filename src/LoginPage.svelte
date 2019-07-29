<svelte:head>
	<title>upchat • login</title>
</svelte:head>

<script>
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import Ajax from "./ajax";
  import Token from "./token";
	import TeamSelectPage from "./TeamSelectPage.svelte";

	let username = "";
	let password = "";
	let errorMessage = "";

	async function authenticate() {
		try {
			const resJson = await Ajax.post("http://localhost:8000/api/auth/authenticate", {
				username,
				password
			});

			Token.set(resJson.token);
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
<div className="entrance-flow">
	<form className="entrance-flow-box" on:submit|preventDefault={authenticate}>
		{errorMessage}
		<div className="form-row">
			<i className="fas fa-fw fa-user"></i>
			<input
				autoFocus
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
</div>
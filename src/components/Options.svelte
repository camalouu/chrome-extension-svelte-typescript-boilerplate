<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../storage";

    let user_info = null;

    onMount(() => {
        storage.get().then(({ user }) => (user_info = user));
    });

    function login() {
        chrome.runtime.sendMessage({ message: "login" }, function (response) {
            user_info = response;
            storage.set({ user: response });
        });
    }

    function logout() {
        storage.set({ user: null }).then((_) => {
            user_info = null;
        });
    }
</script>

<div class="container">
    <p>Is signed in: <b>{!!user_info}</b></p>
    <p id="usr-info">{user_info}</p>
    <div>
        {#if user_info}
            <button on:click={logout}>Log out</button>
        {:else}
            <button on:click={login}>Log in</button>
        {/if}
    </div>
</div>

<style>
    .container {
        min-width: 250px;
    }

    button {
        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        background-color: #2ecc71;
        color: #ecf0f1;
        transition: background-color 0.3s;
        padding: 5px 10px;
        border: none;
    }

    button:hover,
    button:focus {
        background-color: #27ae60;
    }

    #usr-info {
        color: #2ecc71;
        font-weight: bold;
    }
</style>

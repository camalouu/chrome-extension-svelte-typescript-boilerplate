<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../storage";

    let successMessage: string;
    let user_info = null;

    onMount(() => {
        storage.get().then((strg) => (user_info = strg.user));
    });

    function login() {
        chrome.runtime.sendMessage({ message: "login" }, function (response) {
            user_info = response;
            storage.set({ user: response }).then((_) => {
                successMessage = "Successfully signed in";
                setTimeout(() => {
                    successMessage = null;
                }, 2500);
            });
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
    <p>{user_info}</p>
    <div>
        {#if user_info}
            <button on:click={logout}>Log out</button>
        {:else}
            <button on:click={login}>Log in</button>
        {/if}
        {#if successMessage}<span class="success">{successMessage}</span>{/if}
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

    .success {
        color: #2ecc71;
        font-weight: bold;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../storage";
    import Button, { Label } from "@smui/button";
    import ResponseInfo from "./ResponseInfo.svelte";
    import { Image, ImageAspectContainer } from "@smui/image-list";

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
    <div>
        {#if user_info}
            <h2>Welcome {JSON.parse(user_info).name}</h2>
            <ResponseInfo {...JSON.parse(user_info)} />
            <br />
            <Button variant="unelevated" color="primary" on:click={logout}>
                <Label>Log out</Label>
            </Button>
        {:else}
            <h2>Hello</h2>
            <Button variant="raised" color="secondary" on:click={login}>
                <Label>Log in</Label>
            </Button>
        {/if}
    </div>
</div>

<style>
    .container {
        min-width: 250px;
        font-size: large;
    }
</style>

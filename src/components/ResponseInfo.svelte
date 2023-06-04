<script lang="ts">
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    export let email: string;
    export let email_verified: boolean;
    export let family_name: string;
    export let given_name: string;
    export let locale: string;
    export let aud: string;
    export let azp: string;
    export let sub: string;
    export let jti: string;
    export let iss: string;
</script>

<div class="accordion-container">
    <Accordion>
        <Panel>
            <Header>Email</Header>
            <Content>{email}</Content>
        </Panel>
        <Panel>
            <Header>Email verified</Header>
            <Content>{email_verified}</Content>
        </Panel>
        <Panel>
            <Header>Family name</Header>
            <Content>{family_name}</Content>
        </Panel>
        <Panel>
            <Header>Given name</Header>
            <Content>{given_name}</Content>
        </Panel>
        <Panel>
            <Header>Locale</Header>
            <Content>{locale}</Content>
        </Panel>
        <Panel>
            <Header>Some garbage</Header>
            <Content>
                <ul>
                    <li>iss: {iss}</li>
                    <li>aud: {aud}</li>
                    <li>azp: {azp}</li>
                    <li>jti: {jti}</li>
                    <li>sub: {sub}</li>
                </ul>
            </Content>
        </Panel>
    </Accordion>
</div>

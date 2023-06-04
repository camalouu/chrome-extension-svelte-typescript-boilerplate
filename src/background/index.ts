import { storage } from "../storage";
import jwt_decode from "jwt-decode";

chrome.runtime.onInstalled.addListener(() => {
    storage.get().then(console.log);
});

const CLIENT_ID = encodeURIComponent("925065221666-1csft4mv7p1el43bo0mj06f2bdc1e052.apps.googleusercontent.com");
const RESPONSE_TYPE = encodeURIComponent("id_token");
const REDIRECT_URI = encodeURIComponent("https://eabbllcomiclabmahkebaidbjkbmecni.chromiumapp.org");
const SCOPE = encodeURIComponent("openid profile email");
const STATE = encodeURIComponent("meet" + Math.random().toString(36).substring(2, 15));
const PROMPT = encodeURIComponent("consent");

function create_auth_endpoint() {
    let nonce = encodeURIComponent(
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
    let openId_endpoint_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}&nonce=${nonce}&prompt=${PROMPT}`;
    return openId_endpoint_url;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == "login") {
        chrome.identity.launchWebAuthFlow(
            {
                url: create_auth_endpoint(),
                interactive: true,
            },
            function loginResponseCb(redirect_url) {
                let id_token = redirect_url.substring(
                    redirect_url.indexOf("id_token=") + 9
                );
                id_token = id_token.substring(0, id_token.indexOf("&"));
                const user_info = jwt_decode(id_token) as any;
                if (
                    (user_info.iss === "https://accounts.google.com" ||
                        user_info.iss === "accounts.google.com") &&
                    user_info.aud === CLIENT_ID
                ) {
                    console.log("User successfully signed in.", user_info);
                    sendResponse(JSON.stringify(user_info))
                } else {
                    console.log("Invalid credentials.");
                    sendResponse(null)
                }
            }
        );
        return true
    }
})

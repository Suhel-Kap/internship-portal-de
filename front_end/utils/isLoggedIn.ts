import {getCookie} from "cookies-next";

export async function isLoggedIn(){
    const token = getCookie("crp_login_token", {
        path: "/",
    })
    // fetch by passing token
    const res = await fetch("http://localhost:4000/api/v1/users/me", {
        method: "GET",
        headers: new Headers({
            'Authorization': 'Bearer ' + token, // pass token here from cookies
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    })
    const data = await res.json()
    return data.status === "success";
}
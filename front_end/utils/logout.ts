import {deleteCookie} from "cookies-next";
import {NextRouter} from "next/router";

export async function logout(router: NextRouter) {
    try {
        const response = await fetch("http://localhost:4000/api/v1/users/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
            },
        })
        await response.json()
        deleteCookie("crp_login_token", {
            path: "/",
        })
        deleteCookie("email", {
            path: "/",
        })
        await router.push("/login")
        return true
    } catch (e){
        console.log(e)
        return false
    }
}
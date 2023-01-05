import { useState, useEffect } from "react";
import ManageBlog from "./ManageBlog"
import LandingPage from "./LandingPage"

export default function HomePage() {
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

    return (
        <div>

            {user ? <ManageBlog user={user} /> : <LandingPage />}

        </div >
    )
}
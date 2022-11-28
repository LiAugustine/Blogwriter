import { useState, useEffect } from "react"
import { Text } from "@nextui-org/react";
import axios from 'axios'
import './Blog.css'

export default function BlogFeed() {

    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

    const [feed, setFeed] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post('/api/get_user_feed', {
                user
            })
                .then((response) => {
                    setFeed(response.data)
                }
                )
        }
    }, [user]);

    return (
        <div>
            {user ?
                <Text h2 className="centered">Your Feed</Text>




                :
                <Text h2 className="centered">Login Required</Text>
            }
        </div>
    )
}
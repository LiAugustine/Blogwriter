import { useState, useEffect } from "react";
import axios from 'axios'
import { Container, Row, Text } from "@nextui-org/react";
import AddPost from "./AddPost"
import Posts from "./Posts"

export default function ManageBlog() {
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }

    }, []);

    const [blog, setBlog] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post('/api/get_user_blog', {
                user
            })
                .then((response) => {
                    setBlog(response.data)
                })
        }
    }, [user]);

    return (
        <Container>
            <Row justify="center" align="center">
                <Text b h3>
                    Manage Your Blog: {blog}
                </Text>
            </Row>

            <AddPost />

            <br></br>
            <Posts />
        </Container >
    )
}
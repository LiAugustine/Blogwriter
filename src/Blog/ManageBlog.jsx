import { useState, useEffect } from "react";
import axios from 'axios'
import { Container, Row, Text } from "@nextui-org/react";
import AddPost from "./AddPost"
import Posts from "./Posts"

export default function ManageBlog(user) {

    const [blogName, setBlogName] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post('/api/get_user_blog', {
                user
            })
                .then((response) => {
                    setBlogName(response.data)
                }
                )
        }
    }, [user]);



    return (
        <Container>
            <Row justify="center" align="center">
                <Text b h3>
                    Manage Your Blog: {blogName}
                </Text>
            </Row>

            <AddPost user={user} />

            <br></br>
            <Posts user={user} />
        </Container >
    )
}
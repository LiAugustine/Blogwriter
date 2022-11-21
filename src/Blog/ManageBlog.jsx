import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
import { Grid, Button, Container, Card, Row, Text } from "@nextui-org/react";

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
                    Your Blog: {blog}
                </Text>
            </Row>

            <Button as={Link} to="/AddPost" color="success" auto ghost>
                +Add a blog post!
            </Button>

            <Card css={{ mw: "400px" }}>

                <Card.Header>
                    <img

                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        alt="image"
                        width="70px"
                        height="70px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                                Title Placeholder
                            </Text>
                        </Grid>

                    </Grid.Container>


                </Card.Header>
                <Card.Divider />
                <Card.Body>
                    <Text b>
                        Blog Subtitle Placeholder
                    </Text>
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <Row>

                        <Button size="sm" color="error">Edit article!</Button>
                    </Row>
                </Card.Footer>
            </Card>
        </Container >
    )
}
import { useState, useEffect } from "react";
import axios from 'axios'
import { Modal, Grid, Button, Card, Row, Text } from "@nextui-org/react";
import EditPost from "./EditPost"
import DeletePost from "./DeletePost"

export default function Posts(props) {

    const [user, setUser] = useState()

    useEffect(() => {
        setUser(props.user.user.sub)
    }, [props.user.user.sub])

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post('/api/get_posts', {
                user
            })
                .then((response) => {
                    setPosts(response.data)
                }
                )
        }
    }, [user]);
    console.log(posts)

    return (
        <div>
            {posts.map((post) =>
                <Grid.Container gap={2} justify="center">
                    <Card css={{ mw: "400px" }}>
                        <Card.Header>
                            <img

                                src={post.image}
                                alt="image"
                                width="70px"
                                height="70px"
                            />
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        {post.title}
                                    </Text>
                                </Grid>

                            </Grid.Container>


                        </Card.Header>
                        <Card.Divider />
                        <Card.Body>
                            <Text b>
                                {post.subtitle}
                            </Text>
                        </Card.Body>
                        <Card.Divider />
                        <Card.Footer>
                            <Row>
                                <EditPost
                                    id={post.id}
                                    title={post.title}
                                    subtitle={post.subtitle}
                                    image={post.image}
                                    text={post.text} />

                                <DeletePost
                                    id={post.id}
                                    title={post.title}
                                />
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid.Container>
            )
            }
        </div>
    )
}
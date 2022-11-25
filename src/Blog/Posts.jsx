import { useState, useEffect } from "react";
import axios from 'axios'
import { Grid, Button, Card, Row, Text } from "@nextui-org/react";

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

                            <Button size="sm" color="error">Edit article!</Button>
                        </Row>
                    </Card.Footer>
                </Card>
            )
            }
        </div>
    )
}
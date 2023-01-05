import { useState, useEffect } from "react";
import { Grid, Card, Row, Text } from "@nextui-org/react";
import { Link } from "react-router-dom"

export default function ViewPostsTemp(props) {


    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(props.posts)
    }, [props.posts])


    return (
        <div>
            {posts.map((post) =>
                <Grid.Container gap={2} justify="center">
                    <Card
                        css={{ mw: "400px" }}
                        as={Link}
                        to={"/ViewPost/" + post.id}
                    >
                        <Card.Header>
                            <img

                                src={post.image}
                                alt="Post Image"
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

                        </Card.Footer>
                    </Card>
                </Grid.Container>
            )
            }
        </div>
    )
}
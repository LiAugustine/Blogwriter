import { useState, useEffect } from "react"
import { Grid, Card, Text } from "@nextui-org/react";
import axios from 'axios'
import './Blog.css'

export default function BlogFeed() {

    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser.sub)
        }
    }, []);

    const [feed, setFeed] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post('/api/get_blog_feed', {
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
                <>
                    <Text h2 b className="centered">Your Feed</Text>
                    <Text h3 className="centered">Search for blogs to add to your blog feed!</Text>
                    <>
                        {feed.map((post) =>
                            <Grid.Container gap={2} justify="center">
                                <Card css={{ mw: "400px" }}
                                    isPressable
                                    isHoverable
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
                                            <Grid xs={12}>
                                                <Text css={{ color: "$accents8" }}>{post.blog_name}</Text>
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

                                </Card>
                            </Grid.Container>
                        )
                        }
                    </>
                </>


                :
                <Text h2 className="centered">Login Required</Text>
            }
        </div>
    )
}
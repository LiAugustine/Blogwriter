import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
import { Card, Button, Grid, Text, Row } from "@nextui-org/react";
import './Blog.css'

export default function BlogSearch() {
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get("/api/get_all_blogs")
            .then((response) => {
                setBlogs(response.data)
            });
    }, []);



    const onClickFollow = (user_id, blog_author_id) => {
        axios.post('/api/follow_blog', {
            user_id, blog_author_id
        })
            .then(response => {
                alert(response.data)
            })
    }

    return (
        <div>

            <Text h2 b className="centered">Blogs</Text>

            {blogs.map((blog) =>
                <Grid.Container gap={2} justify="center">
                    <Card
                        css={{ mw: "400px" }}

                    >
                        <Card.Header
                            as={Link}
                            to={"/ViewBlog/" + blog.id}>
                            <img
                                src={blog.image}
                                alt="Blog Image"
                                width="70px"
                                height="70px"
                            />
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        {blog.blog_name}
                                    </Text>
                                </Grid>

                            </Grid.Container>
                        </Card.Header>

                        <Card.Body
                            as={Link}
                            to={"/ViewBlog/" + blog.id}>
                            <Text>
                                {blog.description}
                            </Text>
                        </Card.Body>

                        <Card.Divider />

                        <Card.Footer>
                            <Button
                                className="centered"
                                color="warning"
                                onClick={() => onClickFollow(user.sub, blog.author_id)}
                            >
                                +Follow Blogger
                            </Button>
                        </Card.Footer>

                    </Card>
                </Grid.Container>
            )
            }
        </div>

    );
}
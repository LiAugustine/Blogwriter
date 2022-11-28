import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
import { Card, Button, Grid, Text } from "@nextui-org/react";
import './Blog.css'

export default function BlogSearch() {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get("/api/get_all_blogs")
            .then((response) => {
                setBlogs(response.data)
            });
    }, []);

    return (
        <div>

            <Button.Group className="centered" color="primary">
                <Button className="centered">Blogs</Button>
                <Button className="centered" flat as={Link} to="/PostSearch">Blog Posts</Button>
            </Button.Group>



            {blogs.map((blog) =>
                <Grid.Container gap={2} justify="center">
                    <Card css={{ mw: "400px" }}>
                        <Card.Header>
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

                        <Card.Body>
                            <Text className="centered">
                                {blog.description}
                            </Text>
                        </Card.Body>

                        <Card.Divider />

                        <Card.Footer>
                            <Button className="centered" color="warning">
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
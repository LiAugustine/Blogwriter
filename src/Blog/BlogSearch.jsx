import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
import { Card, Button, Row, Collapse, Grid, Text } from "@nextui-org/react";

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
            <Row align="center" justify="center">
                <Button.Group color="primary">
                    <Button>Blogs</Button>
                    <Button flat as={Link} to="/PostSearch">Blog Posts</Button>
                </Button.Group>
            </Row>


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

                        <Card.Divider />

                        <Card.Footer>
                            <Text>
                                {blog.description}
                            </Text>
                        </Card.Footer>

                    </Card>
                </Grid.Container>
            )
            }
        </div>

    );
}
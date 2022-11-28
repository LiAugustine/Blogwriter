import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
import { Button, Row, Collapse, Grid, Text } from "@nextui-org/react";

export default function BlogSearch() {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get("/api/get_all_blogs")
            .then((response) => {
                setBlogs(response.data)
            });
    }, []);

    return (

        <Row align="center" justify="center">
            <Button.Group color="primary">
                <Button>Blogs</Button>
                <Button flat as={Link} to="/PostSearch">Blog Posts</Button>
            </Button.Group>
        </Row>


    );
}
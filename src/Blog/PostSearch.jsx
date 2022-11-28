import { Link } from "react-router-dom"
import { Button, Row, Collapse, Grid, Text } from "@nextui-org/react";
import './Blog.css'

export default function PostSearch() {
    return (
        <Row align="center" justify="center">
            <Button.Group className="centered" color="primary">
                <Button className="centered" flat as={Link} to="/BlogSearch">Blogs</Button>
                <Button className="centered">Blog Posts</Button>
            </Button.Group>
        </Row>
    );

}
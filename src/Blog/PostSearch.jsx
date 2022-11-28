import { Link } from "react-router-dom"
import { Button, Collapse, Grid, Text } from "@nextui-org/react";
import './Blog.css'

export default function PostSearch() {
    return (
        <Button.Group className="centered" color="primary">
            <Button className="centered" flat as={Link} to="/BlogSearch">Blogs</Button>
            <Button className="centered">Blog Posts</Button>
        </Button.Group>
    );

}
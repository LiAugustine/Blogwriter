import { Link } from "react-router-dom"
import { Button, Row, Collapse, Grid, Text } from "@nextui-org/react";


export default function PostSearch() {
    return (
        <Row align="center" justify="center">
            <Button.Group color="primary">
                <Button flat as={Link} to="/BlogSearch">Blogs</Button>
                <Button>Blog Posts</Button>
            </Button.Group>
        </Row>
    );

}
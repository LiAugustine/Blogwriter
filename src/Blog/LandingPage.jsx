import { Grid, Button, Container, Popover, Card, Row, Text } from "@nextui-org/react";
export default function LandingPage() {

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Text h2 color="black" css={{ m: 0 }}>
                            Welcome to Blogwriter!
                        </Text>
                    </Row>

                    <Row justify="center" align="center">
                        <Text h3 color="black" css={{ m: 0 }}>
                            Blogwriter is a blogging platform that allows you to easily create a blog and follow the blogs you like!
                        </Text>
                    </Row>
                    <Row justify="center" align="center">
                        <Text h3 color="black">
                            Sign-in to create a blog.
                        </Text>
                    </Row>
                </Card.Body>
            </Card >
        </Container >
    )
}
import { Container, Card, Text } from "@nextui-org/react";
import './Blog.css'

export default function LandingPage() {

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Text className="centered" h2 color="black" css={{ m: 0 }}>
                        Welcome to Blogwriter!
                    </Text>

                    <Text className="centered" h3 color="black" css={{ m: 0 }}>
                        Blogwriter is a blogging platform that allows you to easily create a blog and follow the blogs you like!
                    </Text>

                    <Text className="centered" h3 color="black">
                        Sign-in to create a blog.
                    </Text>
                </Card.Body>
            </Card >
        </Container >
    )
}
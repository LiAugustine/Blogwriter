import { Button, Container, Popover, Card, Row, Text } from "@nextui-org/react";
import Navbar from "./components/Navbar"
import UserDisplay from "./components/UserDisplay"

export default function App() {
  return (
    <div>
      <Navbar />
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
                Blogwriter is a blogging platform that allows you to easily create a blog or publication.
              </Text>
            </Row>
            <Row justify="center" align="center">

              <UserDisplay msg="Get started by creating an account!" />

            </Row>

          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

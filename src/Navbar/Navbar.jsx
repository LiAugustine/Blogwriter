import { Container, Card, Row, Popover, Input, Navbar, Button, Text, useTheme } from "@nextui-org/react";
import { Link } from "react-router-dom"
import UserDisplay from "./UserDisplay"

export default function App() {

  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Text h3 b color="inherit" hideIn="xs">
          Blogwriter
        </Text>
      </Navbar.Brand>

      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">

        <Navbar.Link as={Link} to="/">
          Home</Navbar.Link>

        <Navbar.Link as={Link} to="/">
          BlogFeed</Navbar.Link>
        <Navbar.Item>
          <Input clearable bordered placeholder="Search for a blog!" />
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>

          <UserDisplay />

        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}

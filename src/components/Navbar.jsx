import { Container, Card, Row, Popover, Input, Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import UserDisplay from "./UserDisplay"

export default function App() {

  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Text h3 b color="inherit" hideIn="xs">
          Blogwriter
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Item>
          <Input clearable bordered placeholder="Search for a blog!" />
        </Navbar.Item>

      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>

          <UserDisplay msg="Sign-in" />

        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}

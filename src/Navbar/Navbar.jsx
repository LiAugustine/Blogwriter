import { Navbar, Button, Text } from "@nextui-org/react";
import { Link } from "react-router-dom"
import { FaHome, FaNewspaper, FaSearch } from "react-icons/fa";
import UserDisplay from "./UserDisplay"

export default function App() {

  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Text h3 b color="inherit" hideIn="xs">
          Blogwriter
        </Text>
      </Navbar.Brand>

      <Navbar.Content hideIn="xs" variant="underline">

        <Navbar.Link as={Link} to="/">
          <FaHome />
          Home
        </Navbar.Link>

        <Navbar.Link as={Link} to="/BlogFeed">
          <FaNewspaper />
          BlogFeed</Navbar.Link>

        <Navbar.Link as={Link} to="/BlogSearch">
          <FaSearch />
          BlogSearch
        </Navbar.Link>


      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>

          <UserDisplay />

        </Navbar.Item>
      </Navbar.Content>
    </Navbar >
  )
}

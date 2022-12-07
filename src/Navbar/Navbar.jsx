import { Navbar, Button, Text, Spacer } from "@nextui-org/react";
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
          <Spacer x={0.2} />
          Home
        </Navbar.Link>

        <Navbar.Link as={Link} to="/BlogFeed">
          <FaNewspaper />
          <Spacer x={0.2} />
          BlogFeed</Navbar.Link>

        <Navbar.Link as={Link} to="/BlogSearch">
          <FaSearch />
          <Spacer x={0.2} />
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

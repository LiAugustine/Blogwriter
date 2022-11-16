import { useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { Avatar, Button, Row, Dropdown, User, Popover, Container, Text } from "@nextui-org/react";


export default function LoginButton() {
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location.reload();
            } catch (err) {
                console.log(err)

            }

        }
    });

    const logout = () => {
        setUser(false)
        localStorage.clear()
        window.location.reload();
    }

    return (
        <div>
            {user ? (
                <div>
                    <Popover placement="bottom">
                        <Popover.Trigger>
                            <User
                                bordered
                                src={user.picture}
                                name={user.name}
                                size="md"
                            />
                        </Popover.Trigger>
                        <Popover.Content>
                            <Container>
                                <Text h4>
                                    Account Options:
                                </Text>
                                <Button
                                    onPress={logout}
                                    size="lg" auto color="error">
                                    Sign-out
                                </Button>
                            </Container>
                        </Popover.Content>
                    </Popover>
                </div>
            ) :
                (
                    <Popover placement="bottom">
                        <Popover.Trigger>
                            <Button size="lg" auto color="success">Sign-in</Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Container>
                                <Text h4>
                                    Sign-in Options:
                                </Text>
                                <Button
                                    onPress={login}
                                    size="lg" auto flat color="success">
                                    Sign-in with Google!
                                </Button>
                            </Container>
                        </Popover.Content>
                    </Popover>
                )
            }
        </div>
    )
}
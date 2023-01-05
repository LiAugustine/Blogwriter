import { useState, useEffect } from "react";
import axios from 'axios'
import { Container, Modal, Button, Text, Input, Row, Spacer } from "@nextui-org/react";
import AddPost from "./AddPost"
import Posts from "./Posts"
import { SlSettings } from "react-icons/sl";
import './Blog.css'

export default function ManageBlog(user) {


    const [blog, setBlog] = useState([])

    const saveChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    };


    // const [user, setUser] = useState()

    // useEffect(() => {
    //     if (typeof (props) !== "undefined") {
    //         setUser(props.user.sub)
    //     }
    // }, [props])

    // console.log("This is the user: " + user)


    const onClickSave = () => {
        axios.post('/api/save_blog_changes', {
            blog
        })
            .then(response =>
                setBlog(response.data))
            .then(
                alert("Changes saved!")
            )
    }


    const [posts, setPosts] = useState([])


    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post('/api/get_posts',
                { user }
            )
                .then((response) => {
                    setPosts(response.data)
                }
                )
        }

        if (typeof (user) !== "undefined") {
            axios.post('/api/get_user_blog',
                { user }
            )
                .then((response) => {
                    setBlog(response.data)
                }
                )
        }
    }, [user]);



    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <Container>
            <Row justify="center" align="center">
                <Text b h2>
                    Manage Your Blog: {blog.blog_name}
                </Text>
            </Row>
            <Row justify="center" align="center">

                <Button auto ghost bordered color="primary" onClick={handler}>
                    <SlSettings />
                    <Spacer x={0.2} />
                    Blog Settings</Button>
            </Row>

            <br></br>
            <Modal
                closeButton
                width="800px"
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={25}>
                        Manage {" "}
                        <Text b size={25}>
                            {blog.blog_name}
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        name="blog_name"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        label="Blog Name"
                        initialValue={blog.blog_name}
                        onChange={saveChange}
                    />
                    <Input
                        name="image"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        label="Image"
                        initialValue={blog.image}
                        onChange={saveChange}
                    />
                    <Input
                        name="description"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        label="Description"
                        initialValue={blog.description}
                        onChange={saveChange}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button auto color="success"
                        onClick={onClickSave}
                    >
                        Save Changes!
                    </Button>
                    {" "}
                    <Button auto flat color="error"
                        onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>



            <AddPost user={user} />

            <br></br>
            <Posts posts={posts} />
        </Container >
    )
}
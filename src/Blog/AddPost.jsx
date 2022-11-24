import React, { useState, useEffect, useRef } from 'react';
import { Input, Row, Grid, Button, Collapse, Container } from "@nextui-org/react";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'
import.meta.env.VITE_TINY_MCE_EDITOR

export default function AddPost(props) {
    const [post, setPost] = useState({
        author_id: props.user.user.sub,
        title: "",
        subtitle: "",
        image: "",
        text: "",
    })

    console.log(post)

    const saveChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    };

    const editorRef = useRef(null);
    const saveArticleText = (e) => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setPost({ ...post, text: editorRef.current.getContent() })
        }
    };

    const onClickAdd = () => {
        axios.post('/api/add_post', {
            post
        })
            .then(response =>
                alert(response.data))
    }

    return (
        <Container fluid>
            <Collapse.Group shadow animated={false}>
                <Collapse title="Add a blog post!">
                    <br></br>
                    <Grid.Container gap={2} align="center" justify="center">
                        <Grid>
                            <Input name='title' clearable rounded bordered width='500px'
                                label="Title *"
                                placeholder="Add post title (required)!"
                                onChange={saveChange}
                            />
                        </Grid>
                        <Grid>
                            <Input name='subtitle' clearable rounded bordered width='500px'
                                label="Subtitle"
                                placeholder="Add post subtitle (optional)!"
                                onChange={saveChange}
                            />
                        </Grid>

                        <Grid>
                            <Input name='image' clearable rounded bordered width='500px'
                                label="Image"
                                placeholder="Add post image (optional)!"
                                onChange={saveChange}
                            />
                        </Grid>
                    </Grid.Container>


                    <>
                        <Editor
                            name='text'
                            onChange={saveArticleText}
                            apiKey={import.meta.env.VITE_TINY_MCE_EDITOR}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Type your article here!</p>"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </>
                    <Row align='center' justify='center'>
                        <Button color='success' size='lg' onClick={onClickAdd}>Add post!</Button>
                    </Row>
                </Collapse>
            </Collapse.Group>
        </Container>
    );
}



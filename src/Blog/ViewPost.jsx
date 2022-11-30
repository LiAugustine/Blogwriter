import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import { Card, Row, Text, Loading, Avatar } from "@nextui-org/react";
import { Editor } from '@tinymce/tinymce-react';
import "./Blog.css"

export default function ViewPost() {
    const { id } = useParams()
    const [post, setPost] = useState([])

    useEffect(() => {
        if (typeof (id) !== "undefined") {
            axios.post('/api/get_post_from_id', {
                id
            })
                .then((response) => {
                    setPost(response.data)
                }
                )
        }
    }, []);

    const editorRef = useRef(null);

    return (
        <div>
            {post ?

                <Card>
                    <Card.Body>
                        <Row align="center" justify="center">
                            <Text h2 b>
                                {post.title}
                            </Text>
                        </Row>

                        <Row align="center" justify="center">
                            <Text color="#889096" h4>
                                {post.subtitle}
                            </Text>
                        </Row>
                        <Row>
                            <Avatar squared src={post.blog_image} />
                            <Text>{post.author_name}</Text>
                            <Row justify="flex-end">
                                <Text>{post.created_at}</Text>
                            </Row>
                        </Row>
                    </Card.Body>
                    <Editor
                        disabled={true}
                        apiKey={import.meta.env.VITE_TINY_MCE_EDITOR}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={post.text}
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
                </Card>


                : <Loading />



            }
        </div>
    )
}
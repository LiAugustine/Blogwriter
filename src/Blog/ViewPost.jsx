import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import { Card, Row, Text, Loading, Avatar } from "@nextui-org/react";
import { Editor } from '@tinymce/tinymce-react';
import Disqus from "disqus-react"
import "./Blog.css"
import "./RmvTxtToolbar.css"

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

    const disqusShortname = "blogwriter"


    return (
        <div>
            {post ?
                <>
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
                                <Avatar squared size="lg" src={post.blog_image} />
                                <Text>{post.author_name}</Text>
                                <Row justify="flex-end">
                                    <Text>{post.created_at}</Text>
                                </Row>
                            </Row>
                        </Card.Body>

                    </Card>

                    <Editor
                        disabled={true}
                        menubar={false}
                        statusbar={false}
                        toolbar={false}
                        branding={false}
                        apiKey={import.meta.env.VITE_TINY_MCE_EDITOR}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={post.text}
                    />

                    <br></br>

                    <Disqus.DiscussionEmbed
                        shortname={disqusShortname}
                        config={
                            {
                                url: "http://localhost:5000/ViewArticle/" + post.id,
                                identifier: post.id,
                                title: post.title,
                            }

                        }
                    />
                </>

                : <Loading />



            }
        </div>
    )
}
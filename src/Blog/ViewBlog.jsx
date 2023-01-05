import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import { Card, Row, Text, Loading, Avatar } from "@nextui-org/react";
import Posts from "./ViewPostsTemp"
import "./Blog.css"

export default function ViewBlog() {
    const { id } = useParams()
    const [blog, setBlog] = useState([])

    useEffect(() => {
        if (typeof (id) !== "undefined") {
            axios.post('/api/get_blog_from_id', {
                id
            })
                .then((response) => {
                    setBlog(response.data)
                }
                )
        }
    }, []);

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (blog.author_id !== undefined) {
            console.log(blog.author_id)
            axios.post('/api/get_posts_for_blog',
                { "author_id": blog.author_id }
            )
                .then((response) => {
                    setPosts(response.data)
                }
                )
        }
    }, [blog.author_id]);


    return (
        <div>
            {blog ?
                <>

                    <Row align="center" justify="center">
                        <Avatar squared size="xl" src={blog.image} />
                    </Row>

                    <Row align="center" justify="center">
                        <Text h2 b>
                            {blog.name}
                        </Text>
                    </Row>

                    <Row align="center" justify="center">
                        <Text h4>
                            {blog.description}
                        </Text>
                    </Row>
                </>
                : <Loading />
            }
            <br></br>

            <Row align="center" justify="center">
                <Text h4 b>
                    Posts by {blog.name}:
                </Text>
            </Row>

            <Posts posts={posts} />

        </div>
    )
}


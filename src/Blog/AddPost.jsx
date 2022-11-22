import React, { useState, useEffect, useRef } from 'react';
import { Collapse, Container } from "@nextui-org/react";
import.meta.env.VITE_TINY_MCE_EDITOR
import TextEditor from "./TextEditor"

export default function AddPost() {

    const [post, setPost] = useState({
        author_id: "",
        title: "",
        subtitle: "",
        topic: "",
        image: "",
        text: "",
    })

    return (
        <Container fluid>
            <Collapse.Group shadow animated={false}>
                <Collapse title="Add a blog post!">
                    <TextEditor />
                </Collapse>
            </Collapse.Group>
        </Container>
    );
}



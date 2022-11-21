import React, { useState, useRef } from 'react';
import { Text, Container } from "@nextui-org/react";
import { Editor } from '@tinymce/tinymce-react';
import.meta.env.VITE_TINY_MCE_EDITOR

export default function App() {
    const [post, setPost] = useState({
        author_id: "",
        title: "",
        subtitle: "",
        topic: "",
        image: "",
        date: "",
        text: "",
    })

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <Container>
            <Text h3>Add a blog post:</Text>
            <>
                <Editor
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
                <button onClick={log}>Log editor content</button>
            </>
        </Container>
    );
}



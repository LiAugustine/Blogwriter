import { useState, useEffect, useRef } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'
import.meta.env.VITE_TINY_MCE_EDITOR

export default function EditPost(props) {
    const [post, setPost] = useState({
        id: props.id,
        title: props.title,
        subtitle: props.subtitle,
        image: props.image,
        text: props.text,
    })
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

    const onClickSave = () => {
        axios.post('/api/save_post_changes', {
            post
        })
            .then(response =>
                alert(response.data))
    }

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return (
        <div>
            <Button auto color="warning" onClick={handler}>
                Edit article
            </Button>
            <Modal
                closeButton
                width="1000px"
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Edit {" "}
                        <Text b size={18}>
                            {props.title}
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        name="title"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        label="Title *"
                        initialValue={props.title}
                        onChange={saveChange}
                    />
                    <Input
                        name="subtitle"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        label="Subtitle"
                        initialValue={props.subtitle}
                        onChange={saveChange}
                    />
                    <Input
                        name="image"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        label="Image"
                        initialValue={props.image}
                        onChange={saveChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Row align="center" justify="center">
                        <>
                            <Editor
                                name='text'
                                onChange={saveArticleText}
                                apiKey={import.meta.env.VITE_TINY_MCE_EDITOR}
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={props.text}
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
                    </Row>
                    <Button auto color="success" onClick={onClickSave}>
                        Save Changes!
                    </Button>
                    {" "}
                    <Button auto flat color="error" onClick={closeHandler}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
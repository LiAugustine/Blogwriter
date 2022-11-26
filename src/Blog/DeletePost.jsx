import { Modal, useModal, Button, Text } from "@nextui-org/react";
import axios from 'axios'


export default function DeletePost(props) {

    const onClickDelete = (post_id) => {
        axios.post('/api/delete_post', {
            post_id
        })
            .then(response => {
                alert(response.data)
            })
    }


    const { setVisible, bindings } = useModal();
    return (
        <div>
            <Button auto color="error" onClick={() => setVisible(true)}>
                Delete Post
            </Button>
            <Modal
                closeButton
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Delete {props.title}?
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text id="modal-description">
                        Are you sure you want to delete the post {" "} {props.title}?
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto color="error" onClick={() => onClickDelete(props.id)}>
                        Delete Post
                    </Button>
                    <Button auto flat onClick={() => setVisible(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

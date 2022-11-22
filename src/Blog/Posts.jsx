import { Grid, Button, Card, Row, Text } from "@nextui-org/react";

export default function Posts() {

    return (
        <Card css={{ mw: "400px" }}>

            <Card.Header>
                <img

                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    alt="image"
                    width="70px"
                    height="70px"
                />
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                            Title Placeholder
                        </Text>
                    </Grid>

                </Grid.Container>


            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Text b>
                    Blog Subtitle Placeholder
                </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Row>

                    <Button size="sm" color="error">Edit article!</Button>
                </Row>
            </Card.Footer>
        </Card>
    )
}
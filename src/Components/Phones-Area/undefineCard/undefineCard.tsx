import "./undefineCard.css";
import image from "../../../Assets/undefine-card-img.jpg";
import { Card, Placeholder } from "react-bootstrap";

function UndefineCard(): JSX.Element {
    return (
        <Card className="undefineCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">

                    <Placeholder xs={7} />
                    <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    );
}

export default UndefineCard;

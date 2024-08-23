import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ContactHead = () => {
    return (
        <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('assets/images/bg_1.jpg')" }}>
            <Container>
                <Row>
                    <Col md={12}>
                        <p><Link to="/" style={{ marginRight: "10px" }}>Home</Link> <span>Contact</span></p>
                        <h1 style={{ textTransform: "uppercase" }}> Contact </h1>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ContactHead;
import { Container, Row, Col } from "react-bootstrap";
import "./Services.css";

const Services = () => {

    const divStyles = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const imgStyle = {
        borderRadius: "50%",
        width: "100%",
        height: "180px",
    };

    const h3Style = {
        fontSize: "15px",
        textTransform: "uppercase",
        fontWeight: "500",
        fontFamily: '"Poppins", Arial, sans-serif',
        color: "#000000",
    };

    const spanStyle = {
        textTransform: 'uppercase',
        color: "rgba(0, 0, 0, 0.5)",
        fontSize: "12px",
        fontWeight: '500',
    };

    return(
        <Container style={{marginBottom: "100px"}}>
            <Row>
                <Col lg={3}>
                    <div style={divStyles} className="service">
                        <img src="assets/images/free-shipping.png" style={imgStyle} alt="img1" />
                        <h3 style={h3Style}>Free Shipping</h3>
                        <span style={spanStyle}>On order over 100$</span>
                    </div>
                </Col>
                <Col lg={3}>
                    <div style={divStyles} className="service">
                        <img src="assets/images/always-fresh.png" style={imgStyle} alt="img2" />
                        <h3 style={h3Style}>Always Fresh</h3>
                        <span style={spanStyle}>Product well pakage</span>
                    </div>
                </Col>
                <Col lg={3}>
                    <div style={divStyles} className="service">
                        <img src="assets/images/high.png" style={imgStyle} alt="img3" />
                        <h3 style={h3Style}>Superior Quality</h3>
                        <span style={spanStyle}>Quality Products</span>
                    </div>
                </Col>
                <Col lg={3}>
                    <div style={divStyles} className="service">
                        <img src="assets/images/support.png" style={imgStyle} alt="img4" />
                        <h3 style={h3Style}>Support</h3>
                        <span style={spanStyle}>24/7 Support</span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Services;
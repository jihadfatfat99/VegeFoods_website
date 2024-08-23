import { Container, Row, Col } from "react-bootstrap";
import "./Features.css";

const Features = () => {
    return (
        <Container>
            <Row>
                <Col lg={4}>
                    <div className="category mg-btm">
                        <img src="assets/images/category-2.jpg" className="img" alt="img1"/>
                        <p className="text">Fruits</p>
                    </div>
                    <div className="category mg-btm">
                        <img src="assets/images/category-1.jpg" className="img" alt="img2"/>
                        <p className="text">Vegetables</p>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="middle">
                        <img src="assets/images/category.jpg" className="img" alt="img3"/>
                        <div className="infos">
                            <h2>Vegetables</h2>
                            <p className="txt">Protect the health of every home</p>
                            <p><a href="/" className="btn btn-primary">Shop now</a></p>
                        </div>
                    </div>
                </Col>
                <Col lg={4}>
                <div className="category mg-btm">
                        <img src="assets/images/category-3.jpg" className="img" alt="img4"/>
                        <p className="text">Juices</p>
                    </div>
                    <div className="category mg-btm">
                        <img src="assets/images/category-4.jpg" className="img" alt="img5"/>
                        <p className="text">Dried</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Features;
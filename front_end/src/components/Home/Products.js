import { Col, Container, Row } from "react-bootstrap";
import "./Products.css";
import { useEffect, useState } from "react";
import api from "../../axiosInst";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Products = () => {

    const isLogged = useSelector((state) => state.auth.isLogged);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/api/products/");
                const data = response.data;
                setProducts(data.slice(0, 8));
                // setProducts(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleAddCart = (id) => {
        if(!isLogged){
            navigate("/login");
        }
        else{
            navigate(`/products/${id}`);
        }
    }

    const handleUpdate = (id) => {
        navigate(`update_product/${id}`);
    }

    const handleDelete = (id) => {
        navigate(`delete_product/${id}`);
    }

    return (
        <section className="ftco-section">
            <Container>
                <Row>
                    <Col md={12} style={{ textAlign: "center" }}>
                        <span className="subheading">Featured Products</span>
                        <h2 className="head2">Our Products</h2>
                        <p className="txt">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {products && products.map((item) => {
                        return (
                            <Col lg={3}>
                                <ProductCard  id={item.id} image={item.image_url} name={item.name} quantity={item.quantity} price={item.unit_price} handleAddCart={() => handleAddCart(item.id)} handleUpdate={() => handleUpdate(item.id)} handleDelete={() => handleDelete(item.id)} />
                            </Col>
                        );
                    })}
                </Row>
                <Row style={{marginTop: "30px"}}>
                    <Col lg={12} style={{textAlign: "center"}}>
                        <p className="head3">Go to products and see all our products</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Products;
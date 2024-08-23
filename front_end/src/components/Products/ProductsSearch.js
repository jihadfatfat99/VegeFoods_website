import { useEffect, useState } from "react";
import api from "../../axiosInst";
import { Col, Container, Row } from "react-bootstrap";
import "./Products.css";
import ProductCard from "../Home/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductSearch = () => {

    const type = useSelector((state) => state.auth.type);
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.auth.isLogged);
    const choices = ['All', 'Fruits', 'Vegetables', 'Juices', 'Dried']
    const [selectedChoice, setChoice] = useState("All");
    const [data, setData] = useState([]);
    const products = selectedChoice === "All" ? data : data.filter((item) => item.category === selectedChoice);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/api/products/");
                setData(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleChoiceClick = (choice) => {
        setChoice(choice);
    }

    const handleAddCart = (id) => {
        if(!isLogged){
            navigate("/login");
        }
        else{
            navigate(`/products/${id}`);
        }
    }

    const handleUpdate = (id) => {
        navigate(`/update_product/${id}`);
    }

    const handleDelete = (id) => {
        navigate(`/delete_product/${id}`);
    }

    return (
        <div style={{paddingTop: '50px', paddingBottom: '100px'}}>
            <Container>
                <Row style={{display: "flex", justifyContent: "center", paddingBottom: '50px'}}>
                    <Col lg={12} style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly" }}>
                        {choices && choices.map((choice,index) => {
                            return(
                                <div key={index} onClick={() => handleChoiceClick(choice)} style={{
                                    color: selectedChoice === choice? "white" : "#82ae46",
                                    backgroundColor: selectedChoice === choice ? "#82ae46" : "white",
                                    borderRadius: "3%",
                                    cursor: "pointer",
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem",
                                    paddingTop: "0.5rem",
                                    paddingBottom: "0.5rem",
                                }}>
                                    {choice}
                                </div>
                            )
                        })}
                    </Col>
                </Row>
                {type === "admin" || type === "farmer" ?
                    <Row style={{display: "flex", justifyContent: "center", paddingBottom: '50px'}}>
                        <Link to="/add_product" className="btn btn-primary">Add new Product</Link>
                    </Row>
                    : null
                }
            </Container>
            <Container>
                <Row>
                    {products && products.map(product => {
                        return(
                            <Col lg={3}>
                                <ProductCard id={product.id} image={product.image_url} name={product.name} quantity={product.quantity} price={product.unit_price} handleAddCart={() => handleAddCart(product.id)} handleUpdate={() => handleUpdate(product.id)} handleDelete={() => handleDelete(product.id)}/>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )

}

export default ProductSearch;
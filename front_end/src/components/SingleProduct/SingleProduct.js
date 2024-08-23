import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../../axiosInst";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./SingleProduct.css";
import { toast } from "react-toastify";

const SingleProduct = () => {
    const { pro_id } = useParams();
    const id = useSelector((state) => state.auth.id);
    const [data, setData] = useState([]);
    const [payment, setPayment] = useState("Visa Card");
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/products/${pro_id}/`);
                setData(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [pro_id]);

    const checkValid = () => {
        if (quantity <= 0 || quantity > data.quantity)
            return false;
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkValid()) {
            try {
                const orderData = {
                    client: id,
                    type_of_payment: payment,
                };
                const orderResponse = await api.post("/api/orders/", orderData);
                if (orderResponse.status === 201) {
                    const newOrderId = orderResponse.data.id;
                    const detailOrderData = {
                        order: newOrderId,
                        product: pro_id,
                        quantity: quantity,
                    };
                    try {
                        const detailOrderResponse = await api.post(`/api/client_orders/${id}/`, detailOrderData);
                        if (detailOrderResponse.status === 201) {
                            toast.success("Added succesfully to your cart!!");
                            navigate("/cart");
                        }
                    }
                    catch (error) {
                        toast.error(error);
                    }
                }
            }
            catch (error) {
                toast.error(error);
            }
        }
        else {
            if (quantity <= 0) {
                toast.warning("Negative or zero quantity!!");
            } else if (quantity > data.quantity) {
                toast.warning("You can't order this amount!");
            }
        }
    }

return (
    <div style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <Container>
            <Row>
                <Col lg={6}>
                    <img src={data.image_url} style={{ width: "100%", height: "100%" }} alt="img" />
                </Col>
                <Col lg={6}>
                    <h3>{data.name}</h3>
                    <span style={{ fontSize: "30px" }}>${data.unit_price}</span>
                    <p style={{ fontSize: "16px", fontFamily: '"Poppins", Arial, sans-serif', fontWeight: "400" }}>{data.description}</p>
                    <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", height: '70%', justifyContent: "space-evenly" }}>
                        <select className="input" name="payment" value={payment} onChange={(e) => setPayment(e.target.value)}>
                            <option value="Visa Card">Visa Card</option>
                            <option value="Pay Pal">Pay Pal</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                        <input className="input" type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <p style={{ fontSize: "16px" }}>{data.quantity} {data.category === "Juices" ? "Bottles" : "Kg"} available</p>
                        <input type="submit" value="Add to Cart" className="btn btn-primary wdth" />
                    </form>
                </Col>
            </Row>
        </Container>
    </div>
)
}

export default SingleProduct;
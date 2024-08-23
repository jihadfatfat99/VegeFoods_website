import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import api from "../../axiosInst";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartTable = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    let finalTotal = 0.0
    const id = useSelector((state) => state.auth.id);

    useEffect(() => {
        const fetchData = async () => {
            if (id !== null) {
                try {
                    const response = await api.get(`/api/client_orders/${id}`);
                    setOrders(response.data);
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                setOrders([]);
            }
        }

        fetchData();
    }, [id]);

    const handleDelete = async (e, product_id) => {
        e.preventDefault();

        try {
            await api.delete(`api/special_delete_order/${id}/${product_id}`);

            setOrders(prevOrders => prevOrders.filter(order => order.id !== product_id));
            toast.success("Delete complete!!");
            // Wait for the state update to complete before navigating
            setImmediate(() => {
                navigate("/cart");
            });
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const handleBuy = async () => {
        try {
            for (let i = 0; i < orders.length; i++) {
                await api.delete(`/api/client_orders/${id}/${orders[i].id}`);
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orders[i].id));
            }
            toast.success("Buy Complete, Enjoy!");
            setImmediate(() => {
                navigate("/cart");
            });
        }
        catch(error){
            console.error("Error deleting order:", error);
        }
    }

    return (
        <div style={{ paddingTop: "5rem" }}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="cart-list">
                            <table className="table">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>Product name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.map((order) => {
                                        
                                        const orderTotal = () => {
                                            const price = parseFloat(order.product.unit_price);
                                            const quantity = parseFloat(order.quantity);
                                            return price * quantity;
                                        }
                                        finalTotal += orderTotal();
                                        return (
                                            <tr className="text-center">
                                                <td className="product-remove"><button onClick={(e) => handleDelete(e, order.id)}><span className="ion-ios-close"></span></button></td>
                                                <td className="image-prod">
                                                    <div className="img" style={{ backgroundImage: `url('${order.product.image_url}')` }}></div>
                                                </td>
                                                <td className="product-name">
                                                    <h3>{order.product.name}</h3>
                                                </td>
                                                <td className="price">${order.product.unit_price}</td>
                                                <td class="quantity">
                                                    <div style={{ border: "1px solid grey" }}>
                                                        <span>{order.quantity}</span>
                                                    </div>
                                                </td>
                                                <td class="total">${orderTotal()}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
                <Row style={{ justifyContent: 'right', paddingTop: "3rem", paddingBottom: "5rem" }}>
                    <Col lg={4}>
                        <div className="cart-total mb-3">
                            <h3>Cart Totals</h3>
                            <p className="d-flex">
                                <span>Subtotal</span>
                                <span>${finalTotal}</span>
                            </p>
                            <p className="d-flex">
                                <span>Delivery</span>
                                <span>$0</span>
                            </p>
                            <p className="d-flex">
                                <span>Discount</span>
                                <span>$0</span>
                            </p>
                            <p className="d-flex total-price">
                                <span>Total</span>
                                <span>${finalTotal}</span>
                            </p>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={handleBuy}>Buy Now!!</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CartTable;
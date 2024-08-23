import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../axiosInst";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [unitPrice, setUnitPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("Fruits");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();


    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
        console.log(image);
    }

    const checkValid = () => {
        if (name && unitPrice > 0 && quantity > 0 && category && description && image !== null)
            return true;
        return false;
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (checkValid()) {
            try {
                const formData = {
                    name: name,
                    unit_price: unitPrice,
                    quantity: quantity,
                    category: category,
                    description: description,
                    image: image,
                }
                console.log(formData);
                const response = await api.post("/api/products/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 201) {
                    toast.success("Add complete!");
                    navigate("/products");
                }
            }
            catch (error) {
                toast.error(error);
            }
        }
        else {
            toast.warning("All fields are required!!");
        }
    }

    return (
        <Container>
            <form onSubmit={(e) => handleAdd(e)}>
                <Row className="row1">
                    <Col lg={6}>
                        <label htmlFor="name">Name</label>
                        <div>
                            <input className="input" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <label htmlFor="unitPrice">Unit Price</label>
                        <div>
                            <input className="input" type="number" name="unitPrice" id="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
                        </div>
                    </Col>
                </Row>
                <Row className="row1">
                    <Col lg={6}>
                        <label htmlFor="quantity">Quantity</label>
                        <div>
                            <input className="input" type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <label htmlFor="category">Category</label>
                        <div>
                            <select className="input" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Juices">Juices</option>
                                <option value="Dried">Dried</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <Row className="row1">
                    <Col lg={6}>
                        <label htmlFor="description">Description</label>
                        <div>
                            <textarea className="input" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <label htmlFor="image">Image</label>
                        <div>
                            <input className="input" type="file" id="image" name="image" accept="image/*" onChange={(e) => handleImage(e)} />
                        </div>
                    </Col>
                </Row>
                <Row className="row1">
                    <Col lg={6}>
                        <input type="submit" value="Add Product" className="btn btn-primary" />
                    </Col>
                    <Col lg={6}>
                        <Link to="/products" className="btn btn-primary">Go Back</Link>
                    </Col>
                </Row>
            </form>
        </Container>
    )

}

export default AddProduct;
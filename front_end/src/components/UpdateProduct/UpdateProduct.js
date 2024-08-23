import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../../axiosInst";
import "./UpdateProduct.css";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [product, setProduct] = useState({});
    const [name, setName] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/products/${product_id}/`);
                setProduct(response.data);
                console.log(response.data); // Log the received data
            } catch (error) {
                console.error(error);
                setProduct({}); // Set an empty array if there's an error
            }
        };
        fetchData();
    }, [product_id]);

    useEffect(() => {
        setName(product.name);
        setUnitPrice(product.unit_price);
        setQuantity(product.quantity);
        setCategory(product.category);
        setDescription(product.description);
        // setImage(product.image.file);
    }, [product]);

    const checkValid = () => {
        if (name && quantity >= 0 && unitPrice > 0 && category && description)
            return true;
        return false;
    }


    const handleUpdate = async(e) => {
        e.preventDefault();
        if(checkValid()){
            let updatedData;
            if(image === null){
                updatedData = { name: name, unit_price: unitPrice, quantity: quantity, category: category, description: description};
            }
            else{
                updatedData = {name: name, unit_price: unitPrice, quantity: quantity, category: category, description: description, image: image};
            }
            try{
                const response = await api.put(`/api/products/${product_id}/`,updatedData,{
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                });
                if(response.status === 200){
                    toast.success("update complete!!");
                    navigate("/products");
                }
            }
            catch(error){
                toast.error(error);
            }
        }
        else{
            toast.warning("Please don't leave any empty field!");
        }
    }

    const handleSetImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    return (
        <Container>
            <form onSubmit={handleUpdate}>
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
                            <span>{product.quantity} {product.category === "Juices" ? "Bottles" : "Kg"}</span>
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
                            <input className="input" type="file" name="image" id="image" defaultValue={image} onChange={(e) => handleSetImage(e)} />
                            <span>{product.image}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="row1">
                    <Col lg={6}>
                        <input type="submit" value="Update Product" className="btn btn-primary" />
                    </Col>
                    <Col lg={6}>
                        <Link to="/products" className="btn btn-primary">Go Back</Link>
                    </Col>
                </Row>
            </form>
        </Container>
    )

}

export default UpdateProduct;
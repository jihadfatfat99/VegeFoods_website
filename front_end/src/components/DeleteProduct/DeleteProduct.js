import { Link, useNavigate, useParams } from "react-router-dom";
import "./DeleteProduct.css";
import { useEffect, useState } from "react";
import api from "../../axiosInst";
import { toast } from "react-toastify";

const DeleteProduct = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await api.get(`/api/products/${product_id}/`);
                setProduct(response.data);
            }
            catch(error){
                console.error(error);
                setProduct({});
            }
        }
        fetchData();
    }, [product_id]);

    const handleDelete = (e) => {
        e.preventDefault();
        try{
            api.delete(`/api/products/${product_id}/`);
            navigate("/products");
            toast.success("Delete successful");
        }
        catch(error){
            toast.error(error);
        }
    }

    return(
        <div className="del-div">
            <div className="question">
                <h3>Are You sure you want to delete the product {product.name}?</h3>
                <div className="btns">
                    <button onClick={(e) => handleDelete(e)} className="btn btn-primary wdth">Yes</button>
                    <Link to="/products" className="btn btn-primary wdth2">No</Link>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct;
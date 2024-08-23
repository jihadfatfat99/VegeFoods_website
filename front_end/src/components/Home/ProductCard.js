import { useSelector } from "react-redux";
import "./ProductCard.css";

const ProductCard = (props) => {

    const isLogged = useSelector((state) => state.auth.isLogged);
    const type = useSelector((state) => state.auth.type);

    return(
        <div className="card">
            <img src={props.image} alt= "product_image" className="img"/>
            <h3 className="prg1">{props.name}</h3>
            <p className="prg2">${props.price}</p>
            { isLogged && (type === "admin" || type === "farmer") ?
            <div className="buttons">
                <button className="btn btn-primary" onClick={props.handleUpdate}>Update</button>
                <button className="btn btn-primary" onClick={props.handleDelete}>Delete</button>
            </div>
            : !isLogged || (isLogged && type === "client") ?
            <div className="buttons">
                {props.quantity > 0 ?
                    <button className="btn btn-primary" onClick={props.handleAddCart}>Add to cart</button>
                :
                    <p style={{color: "red"}}>There is currently no quantity</p>
                }
            </div>
            : null
            }
        </div>
    )
}

export default ProductCard;
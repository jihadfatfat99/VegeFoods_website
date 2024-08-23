import { useSelector } from "react-redux";
import ProductNav from "./ProductNav";
import ProductSearch from "./ProductsSearch";
import Error404 from "../Error404/Error404";

const Products = () => {

    return (
        <div>
            <ProductNav />
            <ProductSearch />
        </div>
    )
}

export default Products;
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { logout } from "../../rtk/slices/auth_slice";

const Navbar = () => {

    const isLogged = useSelector((state) => state.auth.isLogged);
    const type = useSelector((state) => state.auth.type);
    // const id = useSelector((state) => state.auth.id);
    // const [length, setLength] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        // setLength(0);
        navigate("/");
    }

    // useEffect(() => {
    //     const fetchData = async() => {
    //         if(id !== null && type === "client"){
    //             try{
    //                 const response = await api.get(`/api/client_orders/${id}`);
    //                 if(response.status === 200){
    //                     setLength(response.data.length);
    //                 }
    //                 else{
    //                     setLength(0);
    //                 }
    //             }
    //             catch(error){
    //                 console.error(error.message);
    //             }
    //         }
    //         else{
    //             setLength(0);
    //         }
    //     }
    //     fetchData();
    // }, [id]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <a className="navbar-brand" href="index.html">Vegefoods</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                    aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                        <li className="nav-item"><Link to={isLogged ? "/products" : "/login"} className="nav-link">Products</Link></li>
                        { type === "client" || !isLogged ?
                        <li className="nav-item"><Link to={isLogged ? "/contact" : "/login"} className="nav-link">Contact</Link></li>
                        :
                        null
                        }
                        {isLogged ?
                            <li className="nav-item"><Link to="/" onClick={handleLogout} className="nav-link">Logout</Link></li>
                            :
                            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                        }
                        {!isLogged ?
                            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
                            :
                            null
                        }
                        {type === "client" || !isLogged ?
                            <li className="nav-item cta cta-colored"><Link to={isLogged ? "/cart" : "/login"} className="nav-link"><span
                                className="icon-shopping_cart"></span>My Cart</Link></li>
                            :
                            null
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
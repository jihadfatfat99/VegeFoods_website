import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken, setUser, setType, setIsLogged, logout, setId } from "../../rtk/slices/auth_slice";
import api from '../../axiosInst';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const type = useSelector((state) => state.auth.type);
    const isLogged = useSelector((state) => state.auth.isLogged);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const checkValid = () => {
        if (username && password)
            return true;
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (checkValid()) {
                const req = await api.post("api/token/", { username: username, password: password });
                if (req.status === 200) {
                    const data = req.data;
                    const user = jwt_decode(data.access).username;
                    const type = jwt_decode(data.access).type;
                    const id = jwt_decode(data.access).id;
                    dispatch(setAccessToken(data.access));
                    dispatch(setRefreshToken(data.refresh));
                    localStorage.setItem('accessToken', data.access);
                    localStorage.setItem('refreshToken', data.refresh);
                    dispatch(setUser(user));
                    dispatch(setType(type));
                    dispatch(setIsLogged(true));
                    dispatch(setId(id));
                    localStorage.setItem("user", user);
                    localStorage.setItem("type", type);
                    localStorage.setItem("isLogged", isLogged);
                    localStorage.setItem("id", id);
                    navigate("/");
                    toast.success(`welcome ${type} ${user}!!`);
                }
            }
            else {
                toast.warning("username and password should not be empty!");
            }
        }
        catch (error) {
            if (error.response?.status === 401) {
                toast.error(error.response.data.detail);
            } else {
                toast.error(error.message);
            }
        }
        console.log(localStorage);
    }

    return (
        <div className="div">
            <img src="assets/images/veg-shopping.png" alt="img" style={{width: "100%", opacity: "0.25", height: "100vh"}}/>
            <form onSubmit={handleSubmit} className="form">
                <h1 className="head1">WELCOME</h1>
                <div className="form-part">
                    <label htmlFor="username">Username:</label>
                    <input className="input" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-part">
                    <label htmlFor="password">Password: </label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="log">
                    <input type="submit" value="LOGIN" className="btn btn-primary"/>
                    <Link to="/reset_password" style={{marginLeft: "2rem"}}>Forgot your data?</Link>
                </div>
                <div className="reg">
                        <span className="spans">You don't have an account??</span>
                        <Link to="/register">Register</Link>
                </div>
                <div className="reg">
                    <span className="spans">Or</span>
                    <Link to="/">Go Back</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
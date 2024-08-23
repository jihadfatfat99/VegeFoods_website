import { useState } from "react";
import "./Register.css";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../axiosInst";
import { toast } from "react-toastify";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate();

    const checkValid = () => {
        if (name && email && phone && address && username && password)
            return true;
        return false;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(checkValid()){
            try{
                const clientData = {
                    name: name,
                    phone: phone,
                    address: address,
                    username: {
                        username: username,
                        password: password,
                        email: email,
                    }
                };
                const response = await api.post("/api/clients/",clientData);
                if(response.status === 201){
                    toast.success(`Your account has created! now go to your email ${email} and check for a message from us to activate your account`);
                }
            }
            catch(error){
                toast.error(error);
            }
        }
        else{
            toast.warning("Please all fields are required!!");
        }
    }

    return (
        <div className="div2">
            <img src="assets/images/veg-shopping.png" alt="img" style={{ width: "100%", opacity: "0.25", height: "100vh" }} />
            <form onSubmit={(e) => handleSubmit(e)} className="form2">
                <h1 className="head1">CREATE YOUR ACCOUNT</h1>
                <div className="form-part">
                    <label htmlFor="name">Name</label>
                    <input className="input" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-part">
                    <label htmlFor="phone">Phone</label>
                    <input className="input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-part">
                    <label htmlFor="email">Email</label>
                    <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-part">
                    <label htmlFor="address">Address</label>
                    <textarea name="address" cols={23} className="input" id="address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>
                <div className="form-part">
                    <label htmlFor="username">Username</label>
                    <input className="input" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-part">
                    <label htmlFor="pasword">Password</label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="log">
                    <input type="submit" value="REGISTER" className="btn btn-primary" />
                </div>
                <div className="reg">
                    <span className="spans">Already have an account??</span>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <span className="spans">Or</span>
                    <Link to="/">Go Back</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;
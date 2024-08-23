import { useState } from "react";
import api from "../../axiosInst";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(email !== ""){
            try{
                const response = await api.post("/password/reset/",{email: email});
                if(response.status === 200){
                    toast.success(`Go to your email ${email} and wait for a message from us!`);
                }
                else if(response.status === 400){
                    toast.error("incorrect email address!!");
                }
            }
            catch(error){
                toast.error(error);
            }
        }
        else{
            toast.warning("required field!!");
        }
    }

    return(
        <div style={{width: "100%", height: "100vh", position: "relative"}}>
            <img src="/assets/images/prc1.png" style={{width: "100%", height: "100vh", opacity: "0.25"}}/>
            <form onSubmit={(e) => handleSubmit(e)} style={{position: 'absolute', top:"25%", left: "30%", width:"40%", height: "50vh", display:"flex", flexDirection: "column", justifyContent: "space-evenly"}} className="reset_form">
                <h2 style={{alignSelf: "center"}}>Reset Password</h2>
                <div className="form-part">
                    <label htmlFor="email">Your Email: </label>
                    <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Change Password" style={{width: "30%", alignSelf:"center"}} />
                <span style={{alignSelf: "center", fontSize: "20px", color:"black"}}>Or</span>
                <Link to="/login" className="btn btn-primary" style={{width: "30%", alignSelf:"center"}}>Go Back</Link>
            </form>
        </div>
    )
}

export default ResetPassword;
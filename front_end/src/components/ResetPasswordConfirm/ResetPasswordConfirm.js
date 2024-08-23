import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPasswordConfirm.css";
import api from "../../axiosInst";
import { toast } from "react-toastify";

const PasswordResetConfirm = () => {
    const { uidb64, token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const checkValid = () => {
        if(password && confirmPassword)
            return true;
        return false;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(checkValid()){
            try{
                const response = await api.post(`/password/reset/confirm/`,{
                    uidb64: uidb64,
                    token: token,
                    new_password: password,
                    re_new_password: confirmPassword,
                });
                if(response.status === 200){
                    toast.success("Password reset complete!! now login to your account!");
                    navigate("/login");
                }
            }
            catch(error){
                console.error("API error:", error);
                toast.error(error);
            }
        }
        else{
            toast.warning("fields are required!");
        }
    }

    return(
        <div style={{width: "100%", height: "100vh", position: "relative"}}>
            <img src="/assets/images/prc1.png" style={{width: "100%", height: "100vh", opacity: "0.25"}}/>
            <form onSubmit={(e) => handleSubmit(e)} style={{position: 'absolute', top:"25%", left: "30%", width:"40%", height: "50vh", display:"flex", flexDirection: "column", justifyContent: "space-evenly"}} className="reset_form">
                <h2>Reset Password</h2>
                <div className="form-part">
                    <label htmlFor="password">New Password: </label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-part">
                    <label htmlFor="confirm">Confirm New Password: </label>
                    <input className="input" type="password" name="confirm" id="confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Change Password" style={{width: "50%", alignSelf:"center"}} />
            </form>
        </div>
    )
}

export default PasswordResetConfirm;
import { Container, Row, Col } from "react-bootstrap";
import "./Contact.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        toast.success("message sent!!");
        navigate("/contact");
    }

    return (
        <div style={{backgroundColor: "#f7f6f2", paddingTop: "5rem"}}>
            <Container>
                <Row>
                    <Col lg={6}>
                        <img src="assets/images/image_5.jpg" alt="img" style={{width: "100%", height: "100%"}} />
                    </Col>
                    <Col lg={6} style={{backgroundColor: "white"}}>
                        <form style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}} onSubmit={handleSubmit}>
                            <input className="input" type="text" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input className="input" type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input className="input" type="text" name="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                            <textarea cols={25} rows={4} className="input" name="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <input type="submit" value="Send Message" className="btn btn-primary" />
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ContactForm;
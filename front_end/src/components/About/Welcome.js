import { Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {

    const styles = {display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"};

    return(
        <Container className="cont">
            <div style={styles}>
                <div style={{flex: "5", marginRight: "20px"}}>
                    <img src="assets/images/about.jpg" alt="about_img" style={{width: "100%", height: "600px"}} />
                </div>
                <div style={{flex: "6"}}>
                    <h2 className="header">Welcome to Vegefoods an eCommerce website</h2>
                    <p className="paragraph">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    <p className="paragraph">But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
                    <p><Link to="/" className="btn btn-primary">Shop Now</Link></p>
                </div>
            </div>
        </Container>
    )
}

export default Welcome;
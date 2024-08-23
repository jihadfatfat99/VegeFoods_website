import { Container, Row, Col } from "react-bootstrap"

const ContactInfos = () => {

    const divStyles = {
        backgroundColor: "white",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
    };

    const p_style = {
        color: "#000",
        fontFamily: '"Poppins", Arial, sans-serif',
    }

    const span_styles = {
        color: "gray",
        fontFamily: '"Poppins", Arial, sans-serif',
    }

    return(
        <div style={{backgroundColor: "#f7f6f2", paddingTop: "5rem"}}>
            <Container>
                <Row style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={divStyles}>
                        <p style={p_style}><span style={span_styles}>Address: </span>
                            Tripoli, Azmi Street, Laser building.
                        </p>
                    </div>
                    <div style={divStyles}>
                        <p style={p_style}><span style={span_styles}>Phone: </span>
                            +961 76 070 022
                        </p>
                    </div>
                    <div style={divStyles}>
                        <p style={p_style}><span style={span_styles}>Email: </span>
                            vegefoods001@gmail.com
                        </p>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default ContactInfos;
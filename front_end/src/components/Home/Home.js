
import Features from "./Features";
import Intro from "./Intro";
import Products from "./Products";
import Services from "./Services";

const Home = () => {
    return (
        <div>
            <Intro />
            <Services/>
            <Features />
            <Products />
        </div>
    )
}

export default Home;
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import './Intro.css';
// import { Link } from 'react-router-dom';

const Intro = () => {

    const carouselOptions = {
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: false,
        items: 1,
        dotsData: false,
    };

    return (
        <div className="container-fluid p-0 pb-5 wow fadeIn" data-wow-delay="0.1s">
            <OwlCarousel className="header-carousel position-relative"  {...carouselOptions}>
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src="assets/images/bg_1.jpg" alt="carousel-1" />
                    <div className="owl-carousel-inner">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-2 text-white animated slideInDown">We serve Fresh Vegestables &amp; Fruits</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-3" style={{color: "white"}}>We deliver organic vegetables &amp; fruits.</p>
                                    <a href="/" className="btn btn-primary rounded-pill py-3 px-5 animated slideInLeft">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src="assets/images/bg_2.jpg" alt="carousel-2" />
                    <div className="owl-carousel-inner">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-10 col-lg-8">
                                    <h1 className="display-2 text-white animated slideInDown">100% Fresh &amp; Organic Foods</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-3" style={{color: "white"}}>We deliver organic vegetables &amp; fruits.</p>
                                    <a href="/" className="btn btn-primary rounded-pill py-3 px-5 animated slideInLeft">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel>
        </div>
    )
}

export default Intro;
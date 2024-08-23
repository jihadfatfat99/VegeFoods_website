import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Foot = () => {

    const type = useSelector((state) => state.auth.type);

    return (
        <footer className="ftco-footer ftco-section">
            <div className="container">
                <div className="row">
                    <div className="mouse">
                        <a href="#" className="mouse-icon">
                            <div className="mouse-wheel"><span className="ion-ios-arrow-up"></span></div>
                        </a>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Vegefoods</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                <li className="ftco-animate"><Link to="/"><span className="icon-twitter"></span></Link></li>
                                <li className="ftco-animate"><Link to="/"><span className="icon-facebook"></span></Link></li>
                                <li className="ftco-animate"><Link to="/"><span className="icon-instagram"></span></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4 ml-md-5">
                            <h2 className="ftco-heading-2">Menu</h2>
                            {/* <ul className="list-unstyled">
                                <li><a href="#" className="py-2 d-block">Shop</a></li>
                                <li><a href="#" className="py-2 d-block">About</a></li>
                                <li><a href="#" className="py-2 d-block">Journal</a></li>
                                <li><a href="#" className="py-2 d-block">Contact Us</a></li>
                            </ul> */}
                            {type === null ?
                                <ul className="list-unstyled">
                                    <Link to="/" className="py-2 d-block">Home</Link>
                                    <Link to="/about" className="py-2 d-block">About</Link>
                                    <Link to="/login" className="py-2 d-block">Login</Link>
                                    <Link to="/register" className="py-2 d-block">Register</Link>
                                </ul>
                            : type === "client" ?
                                <ul className="list-unstyled">
                                    <Link to="/" className="py-2 d-block">Home</Link>
                                    <Link to="/about" className="py-2 d-block">About</Link>
                                    <Link to="/products" className="py-2 d-block">Products</Link>
                                    <Link to="/contact" className="py-2 d-block">Contact</Link>
                                    <Link to="/cart" className="py-2 d-block">My Cart</Link>
                                </ul>
                            :
                                <ul className="list-unstyled">
                                    <Link to="/" className="py-2 d-block">Home</Link>
                                    <Link to="/about" className="py-2 d-block">About</Link>
                                    <Link to="/products" className="py-2 d-block">Products</Link>
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Help</h2>
                            <div className="d-flex">
                                <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                                    <li><Link to="/" className="py-2 d-block">Shipping Information</Link></li>
                                    <li><Link to="/" className="py-2 d-block">Returns &amp; Exchange</Link></li>
                                    <li><Link to="/" className="py-2 d-block">Terms &amp; Conditions</Link></li>
                                    <li><Link href="/" className="py-2 d-block">Privacy Policy</Link></li>
                                </ul>
                                <ul className="list-unstyled">
                                    <li><Link to="/" className="py-2 d-block">FAQs</Link></li>
                                    <li><Link to="/" className="py-2 d-block">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Have a Questions?</h2>
                            <div className="block-23 mb-3">
                                <ul>
                                    <li><span className="icon icon-map-marker"></span><span className="text">Tripoli, Azmi Street, Laser building.</span></li>
                                    <li><span className="icon icon-phone"></span><span className="text">+961 76 070 022</span></li>
                                    <li><span className="icon icon-envelope"></span><span className="text"><span>vegefoods001@gmail.com</span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>
                            Copyright &copy;
                            <script data-cfasync="false"
                                src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
                            <script>document.write(new Date().getFullYear());</script> All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Foot;
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="container-xxl py-5 wow fadeInUp d-flex align-items-center justify-content-center" data-wow-delay="0.1s" style={{ minHeight: "100vh" }}>
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                        <h1 className="display-1">404</h1>
                        <h1 className="mb-4">Page Not Found</h1>
                        <p className="mb-4">We're sorry, the page you have looked for does not exist on our website! Maybe go to our home page or try using a search?</p>
                        <Link className="btn btn-primary rounded-pill py-3 px-5" to="/">Go Back To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error404;
import {FaFacebookSquare, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";

import "../styles/footer.scss";

const Footer = () => {
    return(<>
        <footer className="footer-wrapper">
            <div className="social-media-wrapper">
                <h3>Follow us</h3>
                <ul className="social-media-list">
                    <li className="social-media-item">
                        <FaFacebookSquare/>
                    </li>
                    <li className="social-media-item">
                        <FaTwitter/>
                    </li>
                    <li className="social-media-item">
                        <FaInstagram/>
                    </li>
                    <li className="social-media-item">
                        <FaLinkedin/>
                    </li>
                </ul>
            </div>
            <div className="newsletter-wrapper">
                <h1>Want to subscribe to our newsletter</h1>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Email" name="name" id='name' required />
                    <label htmlFor="name" className="form__label">Email</label>
                    <button>Subscribe</button>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;
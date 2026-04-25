import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="footer p-10 max-w-7xl mx-auto flex flex-wrap justify-between">
        <aside>
          <div className="text-3xl font-bold text-primary flex items-center gap-2 mb-2">
            🍃 GreenNest
          </div>
          <p>
            Nurture your home with healthy indoor plants.<br />
            Bringing nature to your doorstep since 2025.
          </p>
        </aside>
        
        <nav>
          <header className="footer-title text-black font-bold">Quick Links</header>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/plants" className="link link-hover">Shop Plants</Link>
          <Link to="#" className="link link-hover">About Us</Link>
          <Link to="#" className="link link-hover">Contact</Link>
          <Link to="#" className="link link-hover">Privacy Policy</Link>
        </nav>
        
        <nav>
          <header className="footer-title text-black font-bold">Follow Us</header>
          <div className="grid grid-flow-col gap-4">
            <a href="#" className="btn btn-circle btn-ghost btn-sm text-2xl hover:text-primary"><FaInstagram /></a>
            <a href="#" className="btn btn-circle btn-ghost btn-sm text-2xl hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="btn btn-circle btn-ghost btn-sm text-2xl hover:text-primary"><FaPinterestP /></a>
          </div>
        </nav>
      </div>
      
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© {new Date().getFullYear()} GreenNest. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;

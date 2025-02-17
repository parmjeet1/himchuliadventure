import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 border-t border-gray-200">
      <div className="container mx-auto text-center px-4">
        {/* Logo and Description */}
        <h2 className="text-2xl font-bold text-white tracking-widest">
          HIMCHULI
        </h2>
        <p className="text-sm text-white mt-2">
          Explore the Himalayas with expert-guided trekking adventures.
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="/" className="text-sm text-white hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-sm text-white hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-sm text-white hover:underline">
            Contact
          </Link>
          <Link
            href="/destinations"
            className="text-sm text-white hover:underline"
          >
            Destinations
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-xl text-white hover:text-primary transition" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-xl text-white hover:text-primary transition" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl text-white hover:text-primary transition" />
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl text-white hover:text-primary transition" />
          </a>
        </div>

        {/* Legal Links */}
        <div className="mt-4 text-sm">
          <Link
            href="/privacy-policy"
            className="text-white hover:underline mx-2"
          >
            Privacy Policy
          </Link>
          |
          <Link
            href="/terms-of-service"
            className="text-white hover:underline mx-2"
          >
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white mt-4">
          &copy; {new Date().getFullYear()} HIMCHULI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

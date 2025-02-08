const Footer = () => {
  return (
    <footer className="bg-green-50 py-4 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} HIMCHULI. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="/privacy-policy"
            className="text-secondary text-sm hover:underline mx-2"
          >
            Privacy Policy
          </a>
          |
          <a
            href="/terms-of-service"
            className="text-secondary text-sm hover:underline mx-2"
          >
            Terms of Service
          </a>
        </div>
        <div className="mt-2">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary text-sm hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

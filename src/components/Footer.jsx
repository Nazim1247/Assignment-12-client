
import { FaFacebookSquare, FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/web-logo.png';
import { IoLogoYoutube } from 'react-icons/io5';
const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center bg-black text-white rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <img src={logo} alt="Web Logo" className='w-12 h-12' />
    <h2 className='text-2xl font-bold'>Dream House</h2>
    {/* <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a> */}
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4 text-3xl">
      <a href='https://www.linkedin.com/in/nazim-uddin-a85aba345'>
      <FaLinkedin />
      </a>
      <a href='https://youtube.com/@najimuddin-cv5eb?si=muFnCh-RxYEQ2ub5'>
      <IoLogoYoutube />
      </a>
      <a href='https://www.facebook.com/share/1BPK8VijLn'>
      <FaFacebookSquare />
      </a>
      <a href='https://github.com/Nazim1247'>
      <FaGithub />
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
        </div>
    );
};

export default Footer;
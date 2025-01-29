import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const {user, logoutUser} = useContext(AuthContext);

    const links = <div className='flex lg:flex-row flex-col space-x-3'>
    <li><NavLink to='/' className={({ isActive }) => isActive ? 'btn btn-ghost text-black' : 'btn btn-ghost text-white'}>Home</NavLink></li>
    <li><NavLink to='/allProperties' className={({ isActive }) => isActive ? 'btn btn-ghost text-black' : 'btn btn-ghost text-white'}>All Properties</NavLink></li>
    <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? 'btn btn-ghost text-black' : 'btn btn-ghost text-white'}>Dashboard</NavLink></li>
    </div>

    const handleLogout = ()=>{
      logoutUser()
      .then(() =>{
        navigate('/login')
        Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Logout User Successfully!!",
        showConfirmButton: false,
        timer: 1500
        });
      })
      .catch(error =>{
        console.log(error.message)
      })
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <img className='w-12 h-12 rounded-full mr-2' src={logo} alt="" />
    <a className="text-2xl font-bold text-white hidden md:flex">Dream House</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user && user.email ? 
      <>
      <button className='btn btn-ghost text-white' onClick={handleLogout}>Logout</button>
      <img title={user?.displayName} className='w-12 h-12 rounded-full ml-2' src={user?.photoURL} alt="" />
      </> 
      : 
      <Link className='btn btn-ghost text-white' to='/login'>Login</Link>
    }
    
  </div>
</div>
        </div>
    );
};

export default Navbar;
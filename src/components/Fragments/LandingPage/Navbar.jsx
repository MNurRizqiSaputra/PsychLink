import React from 'react'
import logo from '../../../assets/images/logo3.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav id="header" className="fixed top-0 z-30 w-full text-white">
      <div className="container flex flex-wrap items-center justify-between w-full py-2 mx-auto mt-0">
        <div className="flex items-center pl-4">
          <a className="text-2xl font-bold text-white no-underline toggleColour hover:no-underline lg:text-4xl" href="#">
            {/* Image Logo, buat agar tampilan defaultnya berwarna putih tetapi saat discroll kembali ke warna aslinya*/}
            <img src={logo} className="h-8" alt="Psychlink"  />
            {/* Icon from: http://www.potlabicons.com/ */}
            {/* <svg className="inline h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
              <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)" />
              <path
                className="plane-take-off"
                d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
              />
            </svg> */}
            PSYCHLINK
          </a>
        </div>
        <div className="block pr-4 lg:hidden">
          <button id="nav-toggle" className="flex items-center p-1 text-white transition duration-300 ease-in-out transform hover:text-gray-900 focus:outline-none focus:shadow-outline hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="z-20 flex-grow hidden w-full p-4 mt-2 text-black bg-white lg:flex lg:items-center lg:w-auto lg:mt-0 lg:bg-transparent lg:p-0" id="nav-content">
          <ul className="items-center justify-end flex-1 list-reset lg:flex">
            <li className="mr-3">
              <a className="inline-block px-4 py-2 font-bold text-black no-underline" href="#">Beranda</a>
            </li>
            <li className="mr-3">
              <a className="inline-block px-4 py-2 text-#01ff70 no-underline hover:text-gray-800 hover:text-underline" href="#About">Tentang Kami</a>
            </li>
            <li className="mr-3">
              <a className="inline-block px-4 py-2 text-black no-underline hover:text-gray-800 hover:text-underline" href="#Features">Informasi Kesehatan Mental</a>
            </li>
            <li className="mr-3">
              <a className="inline-block px-4 py-2 text-black no-underline hover:text-gray-800 hover:text-underline" href="#testimoni">Testimoni</a>
            </li>
            <li className="mr-3">
              <a className="inline-block px-4 py-2 text-black no-underline hover:text-gray-800 hover:text-underline" href="#FAQ">FAQ</a>
            </li>
            <li className="mr-3">
              <a className="inline-block px-4 py-2 text-black no-underline hover:text-gray-800 hover:text-underline" href="#kontak">Kontak</a>
            </li>
          </ul>
          <Link to="/login">
          <button
            id="navAction"
            className="px-8 py-4 mx-auto mt-4 font-bold text-gray-800 transition duration-300 ease-in-out transform bg-white rounded-full shadow opacity-75 lg:mx-0 hover:underline lg:mt-0 focus:outline-none focus:shadow-outline hover:scale-105"
          >
            Login
          </button>
          </Link>
        </div>
      </div>
      <hr className="py-0 my-0 border-b border-gray-100 opacity-25" />
    </nav>
  );
};

export default Navbar;

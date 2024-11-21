// First clone the repo from github by either copying ssh or https link 

// Open Vscode, open terminal, (git clone <repo>)

// If you do not have node.js you will need to download it (for the next step)

// For this step make sure your terminal is set to bash

// npm start (this starts the app locally on https://localhost:3000)
// TIP: Once you open locally bookmark the app on firefox or whatever browser you use. Now you have easy access to it.

// Once you have that create your branch like so... {first initial}{last name}-dev Emmanuelle Padilla => epadilla-dev
// This is so we dont mess up the main branch. Common sense don't push broken code.

// I also initialized Docker port but the image hasn't been updated. For now we do it locally while I figure out how it works. if anything heres the image ID (0f9a3175b493) 

// Recommendations: Extensions: Prettier (code formatter) - makes it so on save it reformats; Docker -- need that for extra credit; Live-Share (allows a group of people to work on someones computer)

// ***NOTE*** theres a very important note on app.js and index.js, make sure you understand that.

// Example CODE below:
// Some may not know React so here's some code to help it make a little sense... this is from my other project and it's missing context but hopefully this will serve as a good foundation.
// If you're going to use css styles try to avoid inline declarations of styling. It's a preference but having a seperate .css file makes it easier to change stuff and debug.

import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import {FaEnvelopeOpenText, FaShoppingCart, FaUser, FaClipboardList, FaStar, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./header.css";
import { Label } from "@mui/icons-material";
import { useState } from "react";

const NeverUse =()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially logged out; Set true for testing later!
    
    const handleSignOut = () => {
        setIsLoggedIn(false);
        alert("You've signed out. See you soon!")
    };
  
    return (
        <>
            <div className="grid-container rounded-md">
                <div className="header-container">
                    <div className="nav-left">
                        <a className="logo-icon" href="http://localhost:3000/">
                        <svg width="70" height="48" viewBox="0 0 70 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="70" height="48" fill="white"/>
                            <path d="M28.7051 28.6597C28.7051 31.2397 30.7263 33.3197 33.2376 33.3197H38.3622C40.5467 33.3197 42.323 31.4997 42.323 29.2597C42.323 26.8197 41.2409 25.9597 39.628 25.3997L31.4001 22.5997C29.7872 22.0397 28.7051 21.1797 28.7051 18.7397C28.7051 16.4997 30.4813 14.6797 32.6659 14.6797H37.7905C40.3017 14.6797 42.323 16.7597 42.323 19.3397M35.5 12V36M55.9167 24C55.9167 35.0457 46.7758 44 35.5 44C24.2242 44 15.0833 35.0457 15.0833 24C15.0833 12.9543 24.2242 4 35.5 4C46.7758 4 55.9167 12.9543 55.9167 24Z" stroke="#024641" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.41797 28L4.57397 27.168H8.35697C8.7903 27.168 9.15863 27.0813 9.46197 26.908C9.7653 26.7347 9.9993 26.505 10.164 26.219C10.3286 25.933 10.411 25.634 10.411 25.322C10.411 25.062 10.3546 24.8193 10.242 24.594C10.138 24.36 9.96897 24.1693 9.73497 24.022C9.50097 23.8747 9.19763 23.801 8.82497 23.801H7.38197C6.89663 23.801 6.48063 23.7013 6.13397 23.502C5.79597 23.3027 5.53597 23.034 5.35397 22.696C5.17197 22.3493 5.08097 21.9723 5.08097 21.565C5.08097 21.0883 5.19363 20.6507 5.41897 20.252C5.65297 19.8447 5.9823 19.5197 6.40697 19.277C6.8403 19.0257 7.3603 18.9 7.96697 18.9H11.62L11.477 19.732H7.97997C7.5553 19.732 7.19997 19.8187 6.91397 19.992C6.62797 20.1567 6.4113 20.3733 6.26397 20.642C6.11663 20.902 6.04297 21.1837 6.04297 21.487C6.04297 21.747 6.0993 21.9897 6.21197 22.215C6.32463 22.4317 6.4893 22.605 6.70597 22.735C6.92263 22.865 7.1783 22.93 7.47297 22.93H8.95497C9.4923 22.93 9.93863 23.034 10.294 23.242C10.6493 23.45 10.918 23.7273 11.1 24.074C11.282 24.4207 11.373 24.8063 11.373 25.231C11.373 25.5777 11.2993 25.92 11.152 26.258C11.0133 26.5873 10.8096 26.882 10.541 27.142C10.281 27.402 9.96463 27.61 9.59197 27.766C9.2193 27.922 8.80763 28 8.35697 28H4.41797ZM16.7277 28.169C16.1471 28.169 15.6314 28.0303 15.1807 27.753C14.7301 27.4757 14.3747 27.0987 14.1147 26.622C13.8634 26.1367 13.7377 25.5907 13.7377 24.984C13.7377 24.438 13.8244 23.9353 13.9977 23.476C14.1797 23.0167 14.4354 22.618 14.7647 22.28C15.0941 21.942 15.4754 21.6777 15.9087 21.487C16.3507 21.2963 16.8317 21.201 17.3517 21.201C17.7851 21.201 18.1967 21.279 18.5867 21.435C18.9854 21.5823 19.3364 21.799 19.6397 22.085C19.9431 22.371 20.1814 22.722 20.3547 23.138C20.5281 23.554 20.6061 24.0263 20.5887 24.555C20.5801 24.6677 20.5671 24.7803 20.5497 24.893C20.5411 24.997 20.5237 25.101 20.4977 25.205L20.0557 28H19.1457L19.3537 26.687H19.3407C19.0374 27.1377 18.6604 27.4973 18.2097 27.766C17.7591 28.0347 17.2651 28.169 16.7277 28.169ZM16.9877 27.389C17.4731 27.389 17.9107 27.2633 18.3007 27.012C18.6994 26.7607 19.0201 26.4227 19.2627 25.998C19.5141 25.5733 19.6484 25.101 19.6657 24.581C19.6917 24.0783 19.6051 23.6363 19.4057 23.255C19.2064 22.865 18.9247 22.5573 18.5607 22.332C18.2054 22.1067 17.7937 21.994 17.3257 21.994C16.8404 21.994 16.3941 22.124 15.9867 22.384C15.5794 22.644 15.2544 22.995 15.0117 23.437C14.7691 23.879 14.6477 24.3773 14.6477 24.932C14.6477 25.4087 14.7474 25.8333 14.9467 26.206C15.1547 26.57 15.4321 26.8603 15.7787 27.077C16.1341 27.285 16.5371 27.389 16.9877 27.389ZM24.7408 28C24.2902 28 23.9478 27.8787 23.7138 27.636C23.4885 27.3933 23.3758 27.064 23.3758 26.648C23.3758 26.57 23.3802 26.492 23.3888 26.414C23.4062 26.3273 23.4192 26.245 23.4278 26.167L24.2858 20.629C24.3292 20.317 24.4115 20.0267 24.5328 19.758C24.6542 19.4807 24.8058 19.238 24.9878 19.03C25.1698 18.8133 25.3908 18.6487 25.6508 18.536C25.9108 18.4147 26.2012 18.354 26.5218 18.354C26.9205 18.354 27.2455 18.4363 27.4968 18.601C27.7482 18.757 27.9345 18.9693 28.0558 19.238C28.1858 19.498 28.2508 19.7927 28.2508 20.122C28.2508 20.5727 28.1598 21.0103 27.9778 21.435C27.8045 21.851 27.5445 22.2497 27.1978 22.631C26.8598 23.0123 26.4525 23.3633 25.9758 23.684C25.4992 24.0047 24.9705 24.2863 24.3898 24.529L24.4158 23.684C25.0052 23.4413 25.5208 23.1293 25.9628 22.748C26.4048 22.3667 26.7472 21.955 26.9898 21.513C27.2412 21.071 27.3668 20.6463 27.3668 20.239C27.3668 19.9097 27.2975 19.6453 27.1588 19.446C27.0202 19.238 26.7905 19.134 26.4698 19.134C26.1578 19.134 25.8848 19.2597 25.6508 19.511C25.4255 19.7537 25.2738 20.1177 25.1958 20.603L24.3638 25.998C24.3465 26.0933 24.3335 26.1843 24.3248 26.271C24.3162 26.3577 24.3118 26.44 24.3118 26.518C24.3118 26.752 24.3682 26.9253 24.4808 27.038C24.5935 27.1507 24.7755 27.207 25.0268 27.207H26.3138L26.1968 28H24.7408ZM36.4753 21.37L35.8513 25.296C35.7646 25.9113 35.5609 26.4313 35.2403 26.856C34.9283 27.2807 34.5383 27.6057 34.0703 27.831C33.6023 28.0563 33.0823 28.169 32.5103 28.169C31.9296 28.169 31.4226 28.052 30.9893 27.818C30.5646 27.5753 30.2353 27.2503 30.0013 26.843C29.7759 26.4357 29.6633 25.9763 29.6633 25.465C29.6633 25.387 29.6676 25.3003 29.6763 25.205C29.6849 25.101 29.6936 25.0057 29.7023 24.919L30.2613 21.37H31.1713L30.6123 24.971C30.6036 25.0403 30.5949 25.114 30.5863 25.192C30.5776 25.2613 30.5733 25.3307 30.5733 25.4C30.5733 25.9807 30.7509 26.4573 31.1063 26.83C31.4703 27.194 31.9686 27.376 32.6013 27.376C32.9653 27.376 33.3076 27.298 33.6283 27.142C33.9576 26.986 34.2393 26.7477 34.4733 26.427C34.7159 26.1063 34.8719 25.7033 34.9413 25.218L35.5653 21.37H36.4753ZM40.7241 28C40.1868 28 39.7838 27.8657 39.5151 27.597C39.2465 27.3283 39.1121 26.96 39.1121 26.492C39.1121 26.3447 39.1251 26.1887 39.1511 26.024L40.1521 19.706H41.0621L40.0871 25.907C40.0611 26.063 40.0481 26.1973 40.0481 26.31C40.0481 26.5873 40.1175 26.8083 40.2561 26.973C40.4035 27.129 40.6375 27.207 40.9581 27.207H42.3101L42.1801 28H40.7241ZM38.6051 22.163L38.7351 21.37H43.2591L43.1291 22.163H38.6051ZM47.9612 28.169C47.3545 28.169 46.8085 28.0303 46.3232 27.753C45.8378 27.467 45.4522 27.0813 45.1662 26.596C44.8802 26.102 44.7372 25.5517 44.7372 24.945C44.7372 24.425 44.8282 23.9397 45.0102 23.489C45.2008 23.0383 45.4608 22.644 45.7902 22.306C46.1282 21.9593 46.5182 21.6907 46.9602 21.5C47.4022 21.3093 47.8745 21.214 48.3772 21.214C48.9838 21.214 49.5298 21.357 50.0152 21.643C50.5005 21.9203 50.8862 22.306 51.1722 22.8C51.4582 23.2853 51.6012 23.84 51.6012 24.464C51.6012 24.9667 51.5102 25.4433 51.3282 25.894C51.1462 26.336 50.8905 26.726 50.5612 27.064C50.2318 27.402 49.8462 27.6707 49.4042 27.87C48.9708 28.0693 48.4898 28.169 47.9612 28.169ZM48.0132 27.376C48.5505 27.376 49.0185 27.2417 49.4172 26.973C49.8158 26.6957 50.1278 26.336 50.3532 25.894C50.5785 25.452 50.6912 24.984 50.6912 24.49C50.6912 24.0133 50.5872 23.5887 50.3792 23.216C50.1712 22.8347 49.8895 22.54 49.5342 22.332C49.1788 22.1153 48.7758 22.007 48.3252 22.007C47.8138 22.007 47.3545 22.137 46.9472 22.397C46.5485 22.657 46.2322 23.008 45.9982 23.45C45.7642 23.8833 45.6472 24.3643 45.6472 24.893C45.6472 25.3523 45.7468 25.7727 45.9462 26.154C46.1542 26.5267 46.4358 26.8257 46.7912 27.051C47.1552 27.2677 47.5625 27.376 48.0132 27.376ZM53.7836 28L54.5246 23.255C54.62 22.6483 54.8496 22.1847 55.2136 21.864C55.5863 21.5347 56.0846 21.37 56.7086 21.37H57.8526L57.7226 22.163H56.7606C56.362 22.163 56.0543 22.2583 55.8376 22.449C55.6296 22.631 55.491 22.9257 55.4216 23.333L54.6936 28H53.7836ZM63.1858 30.821C62.7525 30.821 62.3841 30.7343 62.0808 30.561C61.7861 30.3877 61.5608 30.158 61.4048 29.872C61.2575 29.5947 61.1838 29.3 61.1838 28.988C61.1838 28.806 61.2055 28.6197 61.2488 28.429C61.3008 28.2383 61.3658 28.0737 61.4438 27.935C61.0625 27.857 60.7071 27.688 60.3778 27.428C60.0485 27.168 59.7841 26.8257 59.5848 26.401C59.3855 25.9763 59.2858 25.4953 59.2858 24.958C59.2858 24.4207 59.3768 23.9267 59.5588 23.476C59.7495 23.0167 60.0138 22.618 60.3518 22.28C60.6898 21.942 61.0798 21.6777 61.5218 21.487C61.9725 21.2963 62.4578 21.201 62.9778 21.201C63.6798 21.201 64.2691 21.3397 64.7458 21.617C65.2225 21.8943 65.5821 22.2713 65.8248 22.748C66.0675 23.216 66.1888 23.7403 66.1888 24.321C66.1888 24.425 66.1801 24.5333 66.1628 24.646C66.1541 24.7587 66.1411 24.8757 66.1238 24.997L65.5778 28.442C65.4998 28.9447 65.3568 29.3737 65.1488 29.729C64.9408 30.0843 64.6721 30.353 64.3428 30.535C64.0135 30.7257 63.6278 30.821 63.1858 30.821ZM63.1988 30.041C63.6061 30.041 63.9311 29.9023 64.1738 29.625C64.4251 29.3477 64.5898 28.9837 64.6678 28.533L65.0838 25.868C64.9365 25.946 64.7415 26.05 64.4988 26.18C64.2561 26.31 63.9918 26.466 63.7058 26.648C63.4285 26.83 63.1641 27.0337 62.9128 27.259C62.6615 27.4843 62.4535 27.7313 62.2888 28C62.1328 28.2687 62.0548 28.559 62.0548 28.871C62.0548 29.209 62.1501 29.4863 62.3408 29.703C62.5401 29.9283 62.8261 30.041 63.1988 30.041ZM61.8858 27.207C62.1718 26.8257 62.5878 26.453 63.1338 26.089C63.6798 25.725 64.3731 25.387 65.2138 25.075L65.2528 24.776C65.2701 24.6807 65.2788 24.5897 65.2788 24.503C65.2875 24.4163 65.2918 24.3297 65.2918 24.243C65.2918 23.775 65.1965 23.3763 65.0058 23.047C64.8151 22.709 64.5421 22.449 64.1868 22.267C63.8401 22.085 63.4285 21.994 62.9518 21.994C62.4231 21.994 61.9508 22.1283 61.5348 22.397C61.1188 22.657 60.7895 23.008 60.5468 23.45C60.3128 23.892 60.1958 24.386 60.1958 24.932C60.1958 25.348 60.2651 25.7207 60.4038 26.05C60.5511 26.3707 60.7505 26.6307 61.0018 26.83C61.2618 27.0293 61.5565 27.155 61.8858 27.207Z" fill="#134B47"/>
                        </svg>

                        </a>
                        <div class="dropdown">
                            <div class="link">
                                <span class="label">Solutions</span>
                                    <button type="button" class="caret">
                                    <IoMdArrowDropdown/>
                                    </button>
                            </div>
                            <div class="menu-wrap" id="dropdownMenu">
                                <ul class="menu">
                                    <li class="sub-link sub-item">
                                        <a href="/">Something1</a>
                                    </li>
                                    <li class="sub-link sub-item">
                                        <a href="/">Website link #2</a>
                                    </li>
                                    <li class="sub-link sub-item">
                                        <a href="/">Website link #3</a>
                                    </li>
                                    <li class="sub-link sub-item">
                                        <a href="/">Website link #4</a>
                                    </li>
                                    <li class="sub-link sub-item">
                                        <a href="/">Website link #5</a>
                                    </li>
                                    <li class="sub-link sub-item">
                                        <a href="/">Website link #6</a>
                                    </li>
                                    <li class="sub-link sub-item">
                                        <a href="/">Website link #7</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
      
                    <div className="nav-middle">
                        <input className="nav-search" type="text" />
                         <button type="button" className="icon-button"><IoMdSearch /></button>
                    </div>
                    <div className="nav-right">
                        <span className="cart-nav-line">
                        {!isLoggedIn ? (
                            <Link to = "/login"> Sign In </Link> // When logged out, user can ONLY sign in
                        ) : (
                            <div class="dropdown">
                            <div class="link">
                            <span class="label">Account</span>
                                <button type="button" class="caret">
                                    <IoMdArrowDropdown/>
                                </button>
                            </div>
                            <div class="menu-wrap" id="dropdownMenu">
                                <ul class="menu">
                                    <li class="dropdown_item">
                                        <FaUser className="icon1" /> View Profile
                                    </li>
                                    <li class="dropdown_item">
                                        <FaClipboardList className="icon2" /> Purchases
                                    </li>
                                    <li class="dropdown_item">
                                        <FaStar className="icon3" /> Review
                                    </li>
                                    <li class="dropdown_item">
                                        <FaCog className="icon4" /> 
                                        <Link to = "/profile"> Account Settings </Link>
                                    </li>
                                    <li class="dropdown_item">
                                        <FaEnvelopeOpenText className="icon5" /> Contact Us
                                    </li>
                                    <li class="dropdown_item">
                                        <button
                                            class="logout" onClick={handleSignOut}
                                        >
                                        <FaSignOutAlt className="icon6" /> Sign out
                                        </button>
                                    </li>
                                </ul> 
                            </div>
                            </div>
                        )}
                        </span>
      
                        <a id="nav-cart" href="/cart" aria-label="0 items in cart" aria-hidden="true">
                            <div className="cart-container">
                                <span className="cart-nav-line">Cart</span>
                                <button className="icon-button"><FaShoppingCart /></button>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NeverUse;


// .css file

// .header-container {
//     display: flex;
//     flex: 1 0 100%;
//     align-items: center;
//     justify-content: space-between;
//     padding: 20px;
//     border-bottom: 2px solid rgba(197, 195, 195, 0.178);
//   }
  
//   .header-container * {
//     font-size: inherit;
//     box-sizing: border-box;
//   }
  
//   .nav-left,
//   .nav-right {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex: 1;
//     min-width: 150px;
//     box-sizing: border-box;
//     justify-content: space-evenly;
//     background-color: inherit;
//     margin: 0 10px;
//     font-family: Rubik, sans-serif;
//     font-weight: 500px;
//   }
  
//   /* .nav-left {
//     display: flex;
//     flex: 1;
//     align-items: center;
//     background-color: aqua;
//     width: 100%;
//     margin-right: 10px;
//     justify-content: space-evenly;
//     min-width: 150px;
//   } */
  
//   /* .nav-left img {
//     min-width: 100%;
//     width: 100%;
//   } */
  
//   .nav-middle {
//     background-color: inherit;
//     padding: 5px;
//     display: flex;
//     flex: 2;
//     max-width: 50%;
//     justify-content: center;
//     height: 50px;
//   }
  
//   /* .nav-right {
//     background-color: #ca0f0f;
//     display: flex;
//     flex: 0 1 25%;
//     align-items: center;
//     justify-content: space-evenly;
//     margin-left: 10px;
//     min-width: 150px;
//   } */
  
//   .nav-logo {
//     width: 100%;
//     height: 100%;
//     max-width: 100px;
//     max-height: 60px;
//     /* object-fit: contain; */
//   }
  
//   .nav-search {
//     border-radius: 16px;
//     box-sizing: border-box;
//     flex: 1;
//     border: 2.5px solid rgb(46, 46, 46);
//     overflow: hidden;
//   }
  
//   .icon-button {
//     padding: 5px;
//     margin: 0px 5px;
//     background-color: inherit;
//     border: none;
//     min-width: 25px;
//   }
  
//   #nav-cart {
//     text-decoration: none;
//     color: #000000;
//     display: flex;
//     align-items: center;
//     padding: 0px;
//     transition: color 0.2s;
//   }
  
//   #nav-cart span {
//     margin-left: 5px;
//   }
  
//   .cart-container {
//     padding: 5px;
//   }
  
//   .dropdown {
//     position: relative;
//     display: flex;
//     flex: 0 1 25%;
//     /* flex: 1; */
//     padding: 0px 10px;
//     justify-content: center;
//   }
  
//   .link {
//     display: flex;
//     /* align-items: center; */
//     cursor: default;
//   }
  
//   .menu-wrap {
//     visibility: hidden;
//     position: absolute;
//     top: 100%;
//     left: 0;
//     background-color: white;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     border-radius: 4px;
//     padding: 10px 0;
//     min-width: 200px;
//     z-index: 1;
//     opacity: 0;
//     transform: translateY(10px);
//     transition: opacity 0.3s ease, transform 0.3s ease;
//   }
  
//   .caret {
//     background: none;
//     border: none;
//     cursor: pointer;
//     padding: 0px;
//   }
  
//   .dropdown:hover .menu-wrap {
//     visibility: visible;
//     display: block;
//     opacity: 1;
//     transform: translateY(0);
//   }
  
//   .menu {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//   }
  
//   .sub-link {
//     padding: 10px 20px;
//   }
  
//   .sub-link a {
//     text-decoration: none;
//     color: #141446;
//   }
  
//   .sub-link:hover {
//     background-color: #f0f0f0;
//   }
  
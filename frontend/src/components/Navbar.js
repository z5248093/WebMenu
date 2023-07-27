import { useRef, useState, useContext} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css"
import UserStore from '../store/UserStore';
import { UserContext } from "../App";
import logo from '../images/logo2.png'
import { getRoleRouter, getUserInfo, setUserInfo, getColor } from "../util";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header style={{backgroundColor: getColor(getUserInfo()?.Role)}}>
			<img  src={logo} style={{width: '200px', height: '200px'}} ></img>
			<nav ref={navRef}>
			{getRoleRouter(UserStore.loggedIn, getUserInfo()?.Role)?.map((item) => {
				return (
					<a
					onClick={() => {
						if (item?.name === "Log out") {
						setUserInfo(JSON.stringify({ Role: "" }));
						UserStore.setLoggedIn(false);
						}
						window.location.href = item.path;
					}}
					>
					{item?.name}
					</a>
				);
				})}
				<button
					className="nav-btn nav-close-btn navbar"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
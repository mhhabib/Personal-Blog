import React, { useState, useContext } from "react";
import logo from "../images/logo.svg";
import AuthContext from "../context/AuthContext";

const HeaderNav = () => {
	// let Links = [
	// 	{ name: "Home", link: "/" },
	// 	{ name: "Newest", link: "/" },
	// 	{ name: "Oldest", link: "/" },
	// 	{ name: "Top", link: "/" },
	// ];
	// let [menuOpen, setOpen] = useState(false);
	// let { username, logoutUser } = useContext(AuthContext);
	// console.log(username);
	return (
		<>
			<section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
				<div className="py-3 px-4 mx-auto max-w-screen-xl text-center lg:py-8 z-10 relative">
					<h1 className="mb-2 text-3xl font-extrabold font-[Tektur] tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
						<span className="text-2xl text-indigo-600 mr-1 pt-2">
							<ion-icon name="megaphone-outline"></ion-icon>
						</span>{" "}
						<a href="/">Lens of Life</a>
					</h1>
					<a
						href="/"
						className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-3 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
					>
						<span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
							<ion-icon name="megaphone-outline"></ion-icon>
						</span>{" "}
						<span className="text-sm font-medium">
							Every new writes at Sunday @12:00am
						</span>
						<svg
							className="w-2.5 h-2.5 ml-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
					</a>
					{/* <form className="w-full max-w-md mx-auto">
						<label
							for="default-email"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>
							Email sign-up
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
								<svg
									class="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 16"
								>
									<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
									<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
								</svg>
							</div>
							<input
								type="email"
								id="default-email"
								className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Enter your email here..."
								required
							/>
							<button
								type="submit"
								className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Sign up
							</button>
						</div>
					</form> */}
				</div>
				{/* {username ? (
					<p
						className="nav-link"
						onClick={logoutUser}
						style={{ cursor: "pointer", fontWeight: "500" }}
					>
						Logout
					</p>
				) : (
					""
				)} */}
			</section>

			{/* <div className="shadow-md w-full fixed left-0">
				<div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
					<div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
						<span className="text-3xl text-indigo-600 mr-1 pt-2">
							<ion-icon name="megaphone-outline"></ion-icon>
						</span>{" "}
						LoL
					</div>
					<div
						onClick={() => setOpen(!menuOpen)}
						className="text-3xl absolute  right-8 top-6 cursor-pointer md:hidden"
					>
						<ion-icon name={menuOpen ? "close" : "menu"}></ion-icon>
					</div>
					<ul
						className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static
                 bg-white md:z-auto z-[-1] w-full left-0 md:w-auto md:pl-0 pl-9 
                 transition-all duration-500 ease-in ${
						menuOpen
							? "top-20 opacity-100"
							: "top-[-490px] md:opacity-100 opacity-0"
					}`}
					>
						{Links.map((link) => (
							<li
								key={link.name}
								className="md:ml-8 text-xl md:my-0 my-4"
							>
								<a
									href={link.link}
									className="text-gray-800 hover:text-gray-400 duration-500"
								>
									{link.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div> */}
		</>
	);
};

export default HeaderNav;

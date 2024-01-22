import React from "react";
const HeaderNav = () => {
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
				</div>
			</section>
		</>
	);
};

export default HeaderNav;

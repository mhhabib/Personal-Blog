"use client";
import { Footer } from "flowbite-react";
import React, { useContext, useState } from "react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Footerbar = () => {
	const { username, logoutUser } = useContext(AuthContext);
	const [count, setCount] = useState(0)
	const navigate = useNavigate()

	const handleLoginPage = () =>{
		setTimeout(() => {
			setCount(count+1)
			if(count>5){
				console.log("Count: ", count)
				setCount(0);
				navigate('/login')
			}
		}, 1000);
	}
	return (
		<div className="pt-10 bg-gray-100">
			<Footer bgDark>
				<div className="w-full">
					{username && (
						<div className="grid w-full grid-cols-2 gap-8 px-6 py-4 md:grid-cols-4">
							<div>
								<Footer.Title title="Authorization" />
								<Footer.LinkGroup col>
									<Footer.Link href="#" onClick={logoutUser}>
										Logout
									</Footer.Link>
								</Footer.LinkGroup>
							</div>
							<div>
								<Footer.Title title="Create New post" />
								<Footer.LinkGroup col>
									<Footer.Link href="/post">
										Create new
									</Footer.Link>
								</Footer.LinkGroup>
							</div>
							<div>
								<Footer.Title title="Create Thumbnail" />
								<Footer.LinkGroup col>
									<Footer.Link href="#">
										Create new
									</Footer.Link>
								</Footer.LinkGroup>
							</div>
							<div>
								<Footer.Title title="Statistics" />
								<Footer.LinkGroup col>
									<Footer.Link href="#">
										Show Statistics
									</Footer.Link>
								</Footer.LinkGroup>
							</div>
						</div>
					)}
					<div className="w-full bg-gray-700">
						<div className="w-[80%] mx-auto px-4 py-6 sm:flex sm:items-center sm:justify-between">
							<Footer.Copyright
								by="Lensoflife"
								href="/"
								year={2022}
								onClick={handleLoginPage}
							/>
							<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
								<Footer.Icon href="#" icon={BsFacebook} />
								<Footer.Icon href="#" icon={BsInstagram} />
								<Footer.Icon href="#" icon={BsTwitter} />
								<Footer.Icon href="#" icon={BsGithub} />
							</div>
						</div>
					</div>
				</div>
			</Footer>
		</div>
	);
};

export default Footerbar;

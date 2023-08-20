import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
	// const posts = [
	// 	{
	// 		id: 1,
	// 		tag: "Technology",
	// 		thumbnail: `url('https://source.unsplash.com/random/424x320')`,
	// 		title: "Lorem ipsum dolor sit.",
	// 		desc: "Lorem ipsum dolor sit amet consectetur adipisicingelit. Iste, reprehenderit adipisci tempore voluptas laborum quod.",
	// 		date: "August 12, 2023",
	// 		read: 3,
	// 	},
	// 	{
	// 		id: 2,
	// 		tag: "Life experience",
	// 		thumbnail: `url('https://source.unsplash.com/random/424x320')`,
	// 		title: "Lorem ipsum dolor sit.",
	// 		desc: "Lorem ipsum dolor sit amet consectetur adipisicingelit. Iste, reprehenderit adipisci tempore voluptas laborum quod.",
	// 		date: "August 5, 2023",
	// 		read: 4,
	// 	},
	// 	{
	// 		id: 3,
	// 		tag: "Office Jokes",
	// 		thumbnail: `url('https://source.unsplash.com/random/424x320')`,
	// 		title: "Lorem ipsum dolor sit.",
	// 		desc: "Lorem ipsum dolor sit amet consectetur adipisicingelit. Iste, reprehenderit adipisci tempore voluptas laborum quod.",
	// 		date: "July 28, 2023",
	// 		read: 5,
	// 	},
	// 	{
	// 		id: 4,
	// 		tag: "Travel",
	// 		thumbnail: `url('https://source.unsplash.com/random/424x320')`,
	// 		title: "Lorem ipsum dolor sit.",
	// 		desc: "Lorem ipsum dolor sit amet consectetur adipisicingelit. Iste, reprehenderit adipisci tempore voluptas laborum quod.",
	// 		date: "July 21, 2023",
	// 		read: 3,
	// 	},
	// 	{
	// 		id: 5,
	// 		tag: "Technology",
	// 		thumbnail: `url('https://source.unsplash.com/random/424x320')`,
	// 		title: "Lorem ipsum dolor sit.",
	// 		desc: "Lorem ipsum dolor sit amet consectetur adipisicingelit. Iste, reprehenderit adipisci tempore voluptas laborum quod.",
	// 		date: "July 15, 2023",
	// 		read: 7,
	// 	},
	// ];
	let [allposts, setAllposts] = useState([]);
	let { authTokens, logoutUser } = useContext(AuthContext);

	useEffect(() => {
		Posts();
	}, []);

	let Posts = async () => {
		let response = await fetch("http://127.0.0.1:8000/api/posts/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		let data = await response.json();

		if (response.status === 200) {
			setAllposts(data);
		} else if (response.statusText === "Unauthorized") {
			logoutUser();
		}
	};
	console.log("Hello Habib: ", allposts);

	return (
		<>
			{allposts?.map((post) => (
				<div
					key={post.id}
					className="flex items-center justify-between pt-6 mx-auto w-full md:w-full lg:w-[80%] dark:bg-gray-800 dark:text-gray-50"
				>
					<div className="bg-white rounded container grid grid-cols-12 mx-auto dark:bg-gray-900">
						<div className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4 rounded">
							<img src={`${post.thumbnail_image}`} alt="abc" />
						</div>
						{/* <div className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4 bg-[url('https://source.unsplash.com/random/640x480')] rounded" /> */}
						<div className="flex flex-col p-4 col-span-full row-span-full lg:col-span-8 lg:p-4">
							<div className="flex justify-start">
								<span className="px-2 py-1 text-xs rounded-full bg-blue-600 text-white dark:bg-violet-400 dark:text-gray-900">
									{post.tag}
								</span>
							</div>
							<h1 className="text-2xl font-semibold">
								<a href={`post/${post.id}`}>{post.title}</a>
							</h1>
							<p className="flex-1 pt-2">
								{post.body.length > 150
									? post.body.slice(0, 150)
									: post.body}
							</p>
							<a
								rel="noopener noreferrer"
								href={`post/${post.id}`}
								className="inline-flex items-center pt-2 pb-2 space-x-2 text-sm font-semibold text-emerald-600"
							>
								<span>Read more</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-4 h-4"
								>
									<path
										fillRule="evenodd"
										d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</a>
							<div className="flex items-center justify-between pt-2">
								<div className="flex space-x-2 text-amber-700">
									<ion-icon name="calendar-outline"></ion-icon>
									<span className="self-center text-sm ">
										{post.update_date}
									</span>
								</div>
								<span className="text-xs text-amber-700 font-semibold">
									3 min read
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Home;

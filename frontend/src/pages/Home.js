	import React, { useEffect, useState } from "react";
	import { formatDistanceToNow } from "date-fns";
	import {LoadingPage, NoPost} from "./LoadingPage";

	const Home = () => {
		const [allposts, setAllposts] = useState([]);
		const [alltags, setAllTags] = useState([]);
		const [allpostbyview, setAllpostbyview] = useState([]);
		const [postloading, setPostloading] = useState(true);

		const fetchPost = async()=>{
			try{
				const response = await fetch("http://127.0.0.1:8000/api/posts/", {
					method: "GET",
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				let data = await response.json();
				if (response.status === 200) {
					data = data?.filter((item) => item.is_public === true);
					setAllposts(data);
					console.log(data)
					setPostloading(false);
				}
			}
			catch(error){
				console.log("Post: ",error);
			}
		}
		const fetchTags = async()=>{
			try{
				const response = await fetch("http://127.0.0.1:8000/api/tags/", {
					method: "GET",
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				let data = await response.json();
				if (response.status === 200) {
					setAllTags(data);
				}
			}
			catch(error){
				console.log("Tag fetching error: ",error);
			}
		}
		const fetchPostByView = async()=>{
			try{
				const response = await fetch("http://127.0.0.1:8000/api/posts/by_view/", {
					method: "GET",
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				let data = await response.json();
				if (response.status === 200) {
					setAllpostbyview(data);
					console.log(data)
				}
			}
			catch(error){
				console.log("Post by view fetching error: ",error);
			}
		}
		useEffect(() => {
			fetchPost();
			fetchTags();
			fetchPostByView()
		},[]);

		const getText = (html) => {
			const doc = new DOMParser().parseFromString(html, "text/html");
			return doc.body.textContent;
		};
		const getDateFormat = (tDate) => {
			return formatDistanceToNow(new Date(tDate), { addSuffix: true });
		};
		const wordsCount = (data) => {
			return data.split(/\s+/).length;
		};
		const getTagName=(id)=>{
			return alltags?.find((item) => item.id === id)?.name;
		}
		if (postloading) {
			return <LoadingPage/>
		}
		return (
			<>
				{allposts.length===0 && <NoPost/>}
				{allposts?.map((post) => (
					<div
						key={post.id}
						className="flex items-center justify-between pt-6 mx-auto w-full md:w-full lg:w-[80%] dark:bg-gray-800 dark:text-gray-50"
					>
						<div className="bg-white rounded container grid grid-cols-12 mx-auto dark:bg-gray-900">
							<div
								style={{
									backgroundImage: `url(${post.thumbnail_image})`,
									border: "5px solid white",
									boxSizing: "border-box",
								}}
								className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-3 rounded"
							/>

							<div className="flex flex-col p-4 col-span-full row-span-full lg:col-span-9 lg:p-4">
								<div className="flex justify-start">
									<span className="px-2 py-1 mb-2 text-xs rounded-full bg-blue-600 text-white dark:bg-violet-400 dark:text-gray-900">
										{getTagName(post.tag)}
									</span>
								</div>
								<h1 className="text-xl font-semibold">
									<a href={`post/${post.slug}`}>{post.title}</a>
								</h1>
								<p className="flex-1 pt-2">
									{getText(post.body).length > 250
										? getText(post.body).substring(0, 250) +
										" ..."
										: getText(post.body)}
								</p>
								<a
									rel="noopener noreferrer"
									href={`/post/${post.slug}`}
									className="inline-flex items-center pt-2 pb-2 space-x-2 text-emerald-600"
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
											{getDateFormat(post.update_date)}
										</span>
									</div>
									<span className="text-xs text-amber-700 font-semibold">
										{Math.ceil(wordsCount(post.body) / 150)} min
										read
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
				<div className="flex items-center justify-between pt-6 mx-auto w-full md:w-full lg:w-[80%] dark:bg-gray-800 dark:text-gray-50">
					<div className="bg-white rounded container grid mx-auto dark:bg-gray-900 p-4">
						<h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Most viewed 5 posts</h2>
						<ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400">
							{allpostbyview?.map((post)=>(
								<li key={post.id} className="flex items-center">
									<svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
									</svg>
									<a href={`post/${post.id}`}>{post.title}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</>
		);
	};

	export default Home;

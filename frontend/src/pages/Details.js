import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
	const [postloading, setPostloading] = useState(true);
	const [post, setPost] = useState({});
	const location = useLocation();
	const navigate = useNavigate();
	const postId = location.pathname.split("/")[2];
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://127.0.0.1:8000/api/detail-post/${postId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();
				setPost(data.post_details);
				setPostloading(false);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [postId, postloading]);
	if (postloading) {
		return (
			<>
				<main className="pt-4 pb-16 lg:pt-4 lg:pb-24 dark:bg-gray-900">
					<div className="flex justify-between px-4 mx-auto ">
						Loading.....................
					</div>
				</main>
			</>
		);
	}
	return (
		<>
			<main className="pt-4 pb-16 lg:pt-4 lg:pb-24 dark:bg-gray-900">
				<div className="flex justify-between px-4 mx-auto ">
					<article className="mx-auto w-full max-w-4xl bg-white shadow-md rounded p-8 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
						<header className="mb-6 lg:mb-8 not-format">
							<h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-4 lg:text-4xl dark:text-white">
								{post.title}
							</h1>
							<div className="flex items-center justify-between">
								<div className="flex space-x-2 text-amber-700">
									<ion-icon name="calendar-outline"></ion-icon>
									<span className="self-center text-sm ">
										{moment(post.update_date).fromNow()}
									</span>
								</div>
							</div>
						</header>
						<div dangerouslySetInnerHTML={{ __html: post.body }} />
						{/* <p>{ReactQuill.getHTML(post.body)}</p> */}
					</article>
				</div>
			</main>

			<aside
				aria-label="Related articles"
				className="py-10 bg-gray-50 dark:bg-gray-800"
			>
				<div className="px-4 mx-auto max-w-screen-xl">
					<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
						Related articles
					</h2>
					<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
						<article className="max-w-xs">
							<a href="/">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
									className="mb-5 rounded-lg"
									alt="thumbnail"
								/>
							</a>
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="/">Our first office</a>
							</h2>
							<p className="mb-4 font-light text-gray-500 dark:text-gray-400">
								Over the past year, Volosoft has undergone many
								changes! After months of preparation.
							</p>
							<a
								href="/"
								className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
							>
								Read in 2 minutes
							</a>
						</article>
						<article className="max-w-xs">
							<a href="/">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
									className="mb-5 rounded-lg"
									alt="thumbnail"
								/>
							</a>
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="/">Enterprise design tips</a>
							</h2>
							<p className="mb-4 font-light text-gray-500 dark:text-gray-400">
								Over the past year, Volosoft has undergone many
								changes! After months of preparation.
							</p>
							<a
								href="/"
								className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
							>
								Read in 12 minutes
							</a>
						</article>
						<article className="max-w-xs">
							<a href="/">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
									className="mb-5 rounded-lg"
									alt="thumbnail"
								/>
							</a>
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="/">We partnered with Google</a>
							</h2>
							<p className="mb-4 font-light text-gray-500 dark:text-gray-400">
								Over the past year, Volosoft has undergone many
								changes! After months of preparation.
							</p>
							<a
								href="/"
								className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
							>
								Read in 8 minutes
							</a>
						</article>
						<article className="max-w-xs">
							<a href="/">
								<img
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
									className="mb-5 rounded-lg"
									alt="thumbnail"
								/>
							</a>
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="/">Our first project with React</a>
							</h2>
							<p className="mb-4 font-light text-gray-500 dark:text-gray-400">
								Over the past year, Volosoft has undergone many
								changes! After months of preparation.
							</p>
							<a
								href="/"
								className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
							>
								Read in 4 minutes
							</a>
						</article>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Details;

"use-client";
import "react-quill/dist/quill.snow.css";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FaSave, FaCheckCircle, FaPen, FaTrash } from "react-icons/fa";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { qmodules, qformats } from "./EditorPlugins";


const Post = () => {
	const { authTokens } = useContext(AuthContext);
	const [alltags, setAllTags] = useState([]);

	const [publicPost, setPublicPost] = useState([]);
	const [draftPost, setDraftPost] = useState([]);

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [thumbnail_image, setThumbnail_image] = useState(null);
	const [tag, setTag] = useState("");
	const [postStatus, setPostStatus] = useState("")
	const [postType, setPostType] = useState("New")
	const [editPostId, setEditPostId] = useState(null);
	const [currentDate, setCurrentDate] = useState(Date.now());

	useEffect(() => {
		Tags();
		controlData()
	}, []);

	const Tags = async () => {
		const response = await fetch("http://127.0.0.1:8000/api/tags/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (response.status === 200) {
			setAllTags(data);
		}
	};

	const handleSubmit = async (e, isPublic) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", title);
		formData.append("body", body);
		formData.append("tag", tag);
		formData.append("is_public", isPublic);
		formData.append("thumbnail_image", thumbnail_image);
		try {
			let response=null;
			if(editPostId){
				response = await axios.post(
					`http://127.0.0.1:8000/api/update-post/${editPostId}/`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${authTokens?.access}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);
			}
			else{
				response = await axios.post(
					"http://127.0.0.1:8000/api/new-post/",
					formData,
					{
						headers: {
							Authorization: `Bearer ${authTokens?.access}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);
			}

			if (response?.status === 201) {
				setTitle("");
				setBody("");
				setThumbnail_image(null);
				setTag("");
				setPostType("Now");
				setCurrentDate(Date.now())
				if(editPostId) setPostStatus("update")
				else setPostStatus("success")
				editPostId(null)
				setTimeout(() => {
					setPostStatus("");
				}, 1000);
			}
		} catch (error) {
			setPostStatus("error");
			setTimeout(() => {
				setPostStatus("");
			}, 2000);
		}
	};

	const controlData = async () => {
		const response = await fetch("http://127.0.0.1:8000/api/posts/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (response.status === 200) {
			const pubPost = data?.filter((item) => item.is_public === true);
			const drPost = data?.filter((item) => item.is_public === false);
			setPublicPost(pubPost);
			setDraftPost(drPost);
		}
	};
	const deletePost = async(event, postId, isPublic) => {
		event.preventDefault();
		try {
			const response = await axios.delete(
			  `http://127.0.0.1:8000/api/delete-post/${postId}/`,
			  {
				headers: {
				  Authorization: `Bearer ${authTokens?.access}`,
				},
			  }
			);
			if (response.status === 204) {
				if(isPublic) setPublicPost(prevPosts => prevPosts.filter(post => post.id !== postId));
				else setDraftPost(prevPosts => prevPosts.filter(post => post.id !== postId));
				controlData();

				setPostStatus("delete")
				setTimeout(() => {
					setPostStatus("");
				}, 2000);
			}
		  } catch (error) {
			setPostStatus("error")
			setTimeout(() => {
				setPostStatus("");
			}, 2000);
		  }
	};
	const fetchPostData = async (postId) => {
		const response = await axios.get(`http://127.0.0.1:8000/api/detail-post/${postId}/`);
		if (response.status === 200) {
			console.log(response.data.post_details.tag)
			const data=response.data.post_details;
			setTitle(data.title);
			setBody(data.body);
			setTag(String(data.tag));
			setThumbnail_image(data.thumbnail_image)
			console.log(data.thumbnail_image)
			setPostType("Update");
			setCurrentDate(data.update_date)
		}
	};

	const editPost = async (event, postId) => {
		event.preventDefault();
		setEditPostId(postId);
    	await fetchPostData(postId);
	};
	const ShowMessage=()=>{
		if(postStatus==="success") return <p className="text-center p-4 text-green-600">Created new post successfully!!</p>
		if(postStatus==="update") return <p className="text-center p-4 text-green-600">Updated post successfully!!</p>
		else if(postStatus ==="delete") return <p className="text-center p-4 text-red-600">Post deleted successfully!</p>
		else if(postStatus==="error") return <p className="text-center p-4 text-red-600">Something went wrong!</p>
	}
	const geDateToday = (date)=>{
		const nowDate = new Date(date);
		return nowDate.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	}
	
	return (
	
		<div className="py-10">
			<form>
				<div className="flex-none gap-4 w-full mx-auto p-8 h-full lg:w-[80%] lg:flex  bg-white rounded shadow-md">
					<div className="flex-none w-full mb-8 pb-6 lg:p-6 lg:mb-4 lg:w-[60%] lg:flex-1">
						<div className="w-full">
							<div className="mb-2 block">
								<Label
									className="text-sky-600"
									htmlFor="small"
									value="Title*"
								/>
							</div>
							<TextInput
								id="small"
								sizing="sm"
								type="text"
								placeholder="Enter title.."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="w-full h-full mb-12">
							<div className="mb-2 block ">
								<Label
									className="text-sky-600"
									htmlFor="large"
									value="Description*"
								/>
							</div>
							<ReactQuill
								className="w-full h-[318px] mb-12"
								theme="snow"
								modules={qmodules}
								formats={qformats}
								placeholder={"Write something awesome..."}
								value={body}
								onChange={setBody}
							/>
						</div>
					</div>

					<div className="flex-none w-full h-full mb-8 lg:mb-4 lg:w-[40%] lg:flex-2">
						<div className="p-3 pt-6 rounded border border-t-0 border-gray-300 mt-12 relative">
							<div className="flex absolute w-full -top-3 left-0 right-0 items-center">
								<span className="block border-t border-gray-300 flex-0 w-3"></span>
								<h2>Tags</h2>
								<span className="block border-t border-gray-300 flex-1"></span>
							</div>
							{alltags?.map((t) => (
								<div
									key={t.id}
									className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"
								>
									<input
										className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
										type="radio"
										name="flexRadioDefault"
										id={`radioDefault${t.id}`}
										value={String(t.id)}
										checked={tag === String(t.id)}
										onChange={(e) => setTag(e.target.value)}
									/>
									<label
										className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
										htmlFor={`radioDefault${t.id}`}
									>
										{t.name}
									</label>
								</div>
							))}
						</div>

						<div className="p-3 pt-6 rounded border border-t-0 border-gray-300 mt-12 relative">
							<div className="flex absolute w-full -top-3 left-0 right-0 items-center">
								<span className="block border-t border-gray-300 flex-0 w-3"></span>
								<h2>Thumbnail</h2>
								<span className="block border-t border-gray-300 flex-1"></span>
							</div>
							<div className="mb-3">
								<input
									className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
									id="formFileSm"
									type="file"
									accept="image/*"
									onChange={(e) =>
										setThumbnail_image(e.target.files[0])
									}
								/>
							</div>
						</div>

						<div className="p-3 pt-6 rounded border border-t-0 border-gray-300 mt-12 relative">
							<div className="flex absolute w-full -top-3 left-0 right-0 items-center">
								<span className="block border-t border-gray-300 flex-0 w-3"></span>
								<h2>Publish</h2>
								<span className="block border-t border-gray-300 flex-1"></span>
							</div>
							<div className="mb-3">
								<p>
									<span className="text-green-600 font-semibold mr-2">
										Status:
									</span>
									{postType}
								</p>
								<p>
									<span className="text-sky-600 font-semibold mr-2">
										Last update:
									</span>
									{geDateToday(currentDate)}
								</p>
								<Button.Group outline className="mt-4">
									<Button
										gradientDuoTone="greenToBlue"
										outline
										onClick={(e) =>
											handleSubmit(e, true)
										}
									>
										<FaCheckCircle className="mr-3 h-4 w-4" />
										<p>Post</p>
									</Button>
									<Button
										gradientDuoTone="purpleToBlue"
										outline
										onClick={(e) =>
											handleSubmit(e, false)
										}
									>
										<FaSave className="mr-3 h-4 w-4" />
										<p>Draft</p>
									</Button>
								</Button.Group>
								
							</div>
						</div>
					</div>
				</div>
			</form>
			{postStatus && ShowMessage()}
			<div className="mt-8 w-full h-full mx-auto p-8 lg:w-[80%] bg-white rounded shadow-md">
				<h3 className="font-extrabold text-sky-900 text-2xl">
					Draft posts
				</h3>
				<hr className="h-1 w-[30%] my-1 bg-gray-300 border-0 rounded md:my-2 dark:bg-gray-700" />
				<ul className="space-y-1 text-black-800 font-semibold list-inside dark:text-gray-400">
					{draftPost?.map((post) => (
							<li key={post.id} className="flex items-center">
								<svg
									className="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
								</svg>
								{post.title}
								<span className="ml-2 bg-green-800 rounded text-white p-1">
									<a href="/">
										<FaPen onClick={(event)=> editPost(event, post.id)}/>
									</a>
								</span>
								<span className="ml-2 bg-red-800 rounded text-white p-1">
									<FaTrash onClick={(event) => deletePost(event, post.id, 0)} />
								</span>
							</li>
						))
					}
					{draftPost.length===0 && <p>No pending post to show</p>}
				</ul>
			</div>
			<div className="mt-8 w-full h-full mx-auto p-8 lg:w-[80%] bg-white rounded shadow-md">
				<h3 className="font-extrabold text-green-900 text-2xl">
					Published posts
				</h3>
				<hr className="h-1 w-[40%] my-1 bg-gray-300 border-0 rounded md:my-2 dark:bg-gray-700" />
				<ul className="space-y-1 text-black-800 font-semibold list-inside dark:text-gray-400">
					{publicPost?.map((post) => (
							<li
								key={post.id}
								className="flex items-center text-violet-700"
							>
								<svg
									className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
								</svg>
								{post.title}
								<span className="ml-2 bg-green-800 rounded text-white p-1">
									<a href="/">
										<FaPen onClick={(event)=> editPost(event, post.id)}/>
									</a>
								</span>
								<span className="ml-2 bg-red-800 rounded text-white p-1">
									<a href="/">
										<FaTrash onClick={(event) => deletePost(event, post.id, 1)}/>
									</a>
								</span>
							</li>
						))
					}
					{
						publicPost.length===0 && <p>No public post to show</p>
					}
				</ul>
			</div>
		</div>
	);
};

export default Post;

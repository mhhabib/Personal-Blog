import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFetcher } from "react-router-dom";

const qmodules = {
	toolbar: [
		["bold", "italic", "underline", "strike"], // toggled buttons
		[{ list: "ordered" }, { list: "bullet" }],
		[{ align: [] }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		[{ direction: "rtl" }], // text direction
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		["blockquote", "code-block"],

		["link", "image", "video"],
		["clean"],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const qformats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
];

const Register = () => {
	const [desc, setDesc] = useState("");
	useEffect(() => {
		console.log("Effect: ");
		console.log(desc);
	}, [desc]);

	return (
		<div className="w-full p-8 bg-green-300 h-[318px] mb-12">
			<ReactQuill
				theme="snow"
				modules={qmodules}
				formats={qformats}
				value={desc}
				onChange={setDesc}
			/>
			;
		</div>
	);
};
export default Register;

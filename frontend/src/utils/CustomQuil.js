import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
export const CustomQuil = () => {
	return (
		<ReactQuill
			className="w-full h-[318px] mb-12"
			theme="snow"
			modules={qmodules}
			formats={qformats}
			placeholder="Create new post..."
		/>
	);
};

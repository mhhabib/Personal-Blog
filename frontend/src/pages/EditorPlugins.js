const qmodules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ align: [] }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-4" }, { indent: "+4" }],
		[{ color: [] }, { background: [] }],
		["blockquote", "code-block"],

		["link", "image", "video"],
		["clean"],
	],
	clipboard: {
		matchVisual: false,
	},
};

const qformats = [
	"header",
	"font",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"align",
	"script",
	"color",
	"background",
	"code-block",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
];

export {qmodules, qformats}
import React from "react";

const NotFound404 = () => {
	return (
        <div className="h-screen mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg">
				<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-center">
                    4<span className="text-red-600">0</span>4
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white text-center">Something's missing.</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400 text-center">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                <a href="/" className="block mx-auto mt-4 max-w-md rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white text-center">Back to Homepage</a>
			</div>
		</div>
	);
};
export default NotFound404;

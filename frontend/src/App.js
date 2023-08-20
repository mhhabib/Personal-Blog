import "./App.css";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Details from "./pages/Details";
import HeaderNav from "./components/Navbar";
import Footerbar from "./components/Footer";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<AuthProvider>
					<HeaderNav />
					<div className="bg-gray-100 w-full h-full">
						<Routes>
							<Route element={<PrivateRoute />} path="/post">
								<Route element={<Post />} path="/post" />
							</Route>
							<Route element={<Home />} path="/" />
							<Route element={<Post />} path="/post" />
							<Route element={<Details />} path="/post/:id" />
							<Route element={<Register />} path="/register" />
							<Route element={<Login />} path="/login" />
						</Routes>
					</div>
					<Footerbar />
				</AuthProvider>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;

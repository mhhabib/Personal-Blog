import { createContext, useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	const [username, setUsername] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);
	const [loginMessage, setLoginMessage] = useState("");
	const usernameRef = useRef(username);
	useEffect(() => {
		usernameRef.current = username;
	}, [username]);

	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const loginUser = async (e) => {
		e.preventDefault();
		const response = await fetch("http://127.0.0.1:8000/api/token/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		});
		let data = await response.json();

		if (response.status === 200) {
			setAuthTokens(data);
			setUsername(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			navigate("/");
		} else {
			setLoginMessage("Incorrect username or password. Please try again!")
			setTimeout(() => {
				setLoginMessage("");
			}, 3000);
		}
	};

	const logoutUser = () => {
		setAuthTokens(null);
		setUsername(null);
		localStorage.removeItem("authTokens");
		navigate("/");
	};

	const updateToken = async () => {
		const response = await fetch(
			"http://127.0.0.1:8000/api/token/refresh/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refresh: authTokens?.refresh }),
			}
		);
		let data = await response.json();
		if (response.status === 200) {
			setAuthTokens(data);
			setUsername(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			if (usernameRef.current) {
				logoutUser();
			}
		}

		if (loading) {
			setLoading(false);
		}
	};

	const contextData = {
		username: username,
		authTokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
		loginMessage: loginMessage
	};

	useEffect(() => {
		if (loading) updateToken();
		const fourMinutes = 24 * 60 * 1000;
		const interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, fourMinutes);
		return () => clearInterval(interval);
	}, [authTokens, loading]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};

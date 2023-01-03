import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
	const [userName, set] = useState("God of Toe Beans")
	const navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()

		return fetch(`http://localhost:8088/users?userName=${userName}`)
			.then(res => res.json())
			.then(
				foundUsers => {
					if (foundUsers.length === 1) {
						const user = foundUsers[0]
						const userState = {
							id: user.id,
							staff: user.isStaff
						}
						
						localStorage.setItem("toeBean_user", JSON.stringify(userState))

						navigate("/")
					}
					else {
						const user = foundUsers[0]
						const userState = {
							id: user.id,
							staff: user.isStaff
						}
						localStorage.setItem("toeBean_user", JSON.stringify(userState))

						navigate("/")
					}
				}
			)
	}

	return (
		<main className="container--login">
			<section>
				<form className="form--login" onSubmit={handleLogin}>
					<h1>Let There Be Beans</h1>
					<h2>Sign in for beans</h2>
					<fieldset>
						<label htmlFor="inputUserName"> Username </label>
						<input type="username"
							value={userName}
							onChange={evt => set(evt.target.value)}
							className="form-control"
							placeholder="Username"
							required autoFocus />
					</fieldset>
					<fieldset>
						<button type="submit">
							Sign in
						</button>
					</fieldset>
				</form>
			</section>
		</main>
	)
}


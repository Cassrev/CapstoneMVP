import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { SubmitBox } from "./SubmitBox/SB"

import "./LTBB.css"

export const Beans = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />

		<Route path="*" element={
				<Authorized>
					<>
						<NavBar />
						<ApplicationViews />
					</>
				</Authorized>

			}
		/>
	</Routes>
}


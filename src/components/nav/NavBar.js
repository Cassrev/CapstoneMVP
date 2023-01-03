import { PublicNav } from "./PublicNav"
import "./NavBar.css"

export const NavBar = () => {
	const localStorage_user = localStorage.getItem("toeBean_user")
	const user = JSON.parse(localStorage_user)
	
	return <PublicNav/>
}


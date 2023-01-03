import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
	const location = useLocation()
	
	const localStorage_user = localStorage.getItem("toeBean_user")
	if (localStorage_user) {
		return children
	}
	else {
		return <Navigate
			to={`/login/${location.search}`}
			replace
			state={{ location }} 
		/>
	}
}


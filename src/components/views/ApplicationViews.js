import { LocalView } from "./LocalView"

export const ApplicationViews = () => {
	const localStorage_user = localStorage.getItem("toeBean_user")
	const user = JSON.parse(localStorage_user)

	return <LocalView />
}
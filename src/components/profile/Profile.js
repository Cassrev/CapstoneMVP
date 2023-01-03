import {UserProfile} from "./userProfile"

export const Profile = () => {
	const localStorage_user = localStorage.getItem("toeBean_user")
	const user = JSON.parse(localStorage_user)
	
	// return customer views here
	return <UserProfile />
}
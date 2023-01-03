import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Member } from "../Members/Member"
import { UserProfile } from "../profile/userProfile"

import "./adminCorner.css"

export const AdminCorner = () => {
	const [members, setMember] = useState([])
	const [ban, assignBan] = useState({
		description: "",
		ban: false
	})

	useEffect(
		() => {
			fetch(`http://localhost:8088/members?`)
				.then(response => response.json())
				.then((customerArray) => {
					setMember(customerArray)
				})
		},
		[]
	)
	
	const { banId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		fetch(`http://localhost:8088/members/${members.userId}`)
		.then(response => response.json())
		.then(
			(data) => {
				assignBan(data)
			}
		)
	}, [banId])

	const handleSaveButtonClick = (event) => {
		event.preventDefault()

		return fetch(`http://localhost:8088/members/${ban.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(ban)
			}
		)
		.then(response => response.json())
		.then(() => {
			navigate("/ban")
		})
	}

	return (
		<>
		<UserProfile/>
		</>  
	)
	// <form className="memberForm">
	// 	<article className="members">
	// 		<h2 className="ticketForm__title">This supposed to be separate member things</h2>
	// 	{
	// 		members.map(member => <Member key={`members--${member.id}`}
	// 			id={member.id}
	// 			userName={member?.users?.userName}
	// 			/>)
				
	// 	}
		
	// 	<fieldset>
	// 		<div className="form-group">
	// 			<label htmlFor="name">Ban:</label>
	// 			<input type="checkbox"
	// 				checked={ban.ban}
	// 				onChange={
	// 					(evt) => {
	// 						const copy = { ...members }
	// 						copy.ban = evt.target.checked
	// 						assignBan(copy)
	// 					}
	// 				} />
	// 		</div>
	// 	</fieldset>
	// 	<button
	// 		onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
	// 		className="btn btn-primary">
	// 		Ban Illegal Bean User
	// 	</button>
		
	// </article>
	// </form>
}
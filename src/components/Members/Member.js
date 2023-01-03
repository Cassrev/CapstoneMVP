import { Link } from "react-router-dom"
import {UserPostList} from "../profile/userGalleryB"
import React, { useState, useEffect } from "react"

export const Member = ({ id, userName }) => {
	const [member, setMemberList] = useState([])

	const getAllUsers = () => {
		fetch(`http://localhost:8088/members/`)
			.then(response => response.json())
			.then((memberArray) => {
				setMemberList(memberArray)
			})
	}
	
	useEffect(
		() => {
			fetch(`http://localhost:8088/members?`)
				.then(response => response.json())
				.then(
					(memberArray) => {
						setMemberList(memberArray)
					}
				)
		},
		[]
	)
	
	return <section className="members">
		<div>
			<Link to={`/members/${id}/profile`}>{member.userName}y u no work</Link>'s Profile
		</div>
	</section>
}
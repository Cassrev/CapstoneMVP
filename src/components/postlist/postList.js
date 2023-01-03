import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const PostList = ({ searchTermState }) => {
	const [post, setPost] = useState([])
	const [employees, setEmployees] = useState([])
	const [filteredPost, setFiltered] = useState([])
	const [emergency, setEmergency] = useState(false)
	const [openOnly, setOpenOnly] = useState(false)
	const navigate = useNavigate()


	const localHoneyUser =  localStorage.getItem("honey_user")
	const honeyUser = JSON.parse(localHoneyUser)

	useEffect(
		() => {
			const searchedTickets = tickets.filter(
				ticket => {
					return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
				}
			)
			setFiltered(searchedTickets)
		},
		[ searchTermState ]
	)

	useEffect(
		() => {
			if (emergency){
			   const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
			   setFiltered(emergencyTickets)
			}
			else {
				setFiltered(tickets)
			}
		},
		[emergency]
	)

	const getAllPost = () => {
		fetch(`http://localhost:8088/post?`)
			.then(
				response => response.json()
			)
			.then(
				(postArray) => {
					setPost(postArray)
				}
			)
	}

	useEffect(
		() => {
			getAllPost()

			fetch(`http://localhost:8088/employees?_expand=user`)
				.then(
					response => response.json()
				)
				.then(
					(employeeArray) => {
						setEmployees(employeeArray)
					}
				)
			// console.log("Initial state of tickets", tickets) // View the initial state of tickets
		},
		[] // When this array is empty, you are observing initial component state
	)

	useEffect(
			() => {
				if  (honeyUser.staff) {
					// For employees
					setFiltered(tickets)
				}
				else {
					// For customers
					const myTickets = tickets.filter(ticket => ticket.userId === honeyUser.id)
					setFiltered(myTickets)
				}
			},
			[tickets]
		)

		useEffect(
			() => {
				if (openOnly){
					const openTicketArray = tickets.filter(
						ticket => {
							return ticket.userId === honeyUser.id && ticket.dateCompleted === ""
						}
					)
					setFiltered(openTicketArray)
				}
				else {
					const myTickets = tickets.filter(
						ticket => ticket.userId === honeyUser.id
					)
					setFiltered(myTickets)
				}
			},
			[ openOnly ]
		)

	return <>
	
	{
		honeyUser.staff
		? 	<>
			<button	onClick={
				() => {
					setEmergency(true)
				}
			}>
				Emergency Only
			</button>
			<button	onClick={
					() => {
						setEmergency(false)
					}
				}>
					Show All
			</button>
			</>
		: <>
			<button onClick={
				() => navigate("/ticket/create")
			}>
				Create Ticket
			</button>

			<button onClick={
				() => setOpenOnly(true)   
			}>
				Open Ticket
			</button>
			<button onClick={
				() => setOpenOnly(false)
			}>
				All My Tickets
			</button>
		</>
	}
		<h2>List of Tickets</h2>

		<article className="tickets">
		{
			filteredTickets.map(
				(ticket) => <Ticket employees={employees} 
				getAllTickets={getAllTickets}
				currentUser={honeyUser} 
				ticketObject={ticket}/>
			)
		}       
		</article>
	</>
}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./lightBGB.css"


import { DeleteButton} from "./deletebutn"
import { EditButton} from "./editbutn"
import { SubmitBox } from "../SubmitBox/SB"


//To continue flip card: https://medium.com/@amie.n.foster/flipping-out-how-to-create-a-card-that-flips-with-react-and-css-131dba54fc96
// another possibility? https://www.geeksforgeeks.org/design-a-flip-card-effect-using-reactjs/

export const DemoGB = () =>{
	const navigate = useNavigate()

	const [posts, setPost] = useState([])
	const [flip, setFlip] = useState(false)

	const [caption, setCaption] = useState(
		{
			captionText: ""
		}
	)

	useEffect(
		() => {
			getAllPost()
		},
		[]
	)
	
	/**
	 * Gets all the posts
	 *
	 * @return  {Promise}  The fetch request for all the posts
	 */
	const getAllPost = () => {
		const fetch_request = fetch(`http://localhost:8088/posts/`)
			.then(response => response.json())
			.then((postArray) => {
				setPost(postArray)
			})
		
		return fetch_request;
	}
	/**
	 * Handles the save button being clicked
	 *
	 * @param   {HTMLEvent}  event  Onclick event
	 *
	 * @return  {Promise}         Promise that is the request to save the post
	 */
	const handleSaveButtonClick = (event) => {
		event.preventDefault()

		return fetch(`http://localhost:8088/posts/${posts.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(caption)
		})
			.then(response => response.json())
			.then(() => {
				navigate("/posts")
			})
	}
	

var card = document.querySelector('.flip-box');
if(card){
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});
}


	return (
		<>
			<SubmitBox />
			<Carousel showArrows={true} showThumbs={false}>
				{
					posts.map(
						(postObj) => (
						<>

							<div key={postObj.id} className={`post-container${flip ? "flip" : ""}`}>
								
								{/* FRONT CARD */}
									<div className="front"onClick={() => setFlip(!flip)}>
										<div className="image-container" style={
											{
												backgroundImage: 'url('+postObj.imgUrl+')'
											}
											}>
										</div>
										
											<img src={postObj.imgUrl} />
											<p className="caption">{postObj.captionText}</p>
									</div>
								{/* FRONT CARD ENDS HERE */}

								{/* BACK CARD */}
									<div className="back"onClick={() => setFlip(!flip)}>
										<p>back</p>
										<DeleteButton/>
										<EditButton/>
									</div>
								{/* BACK CARD ENDS HERE */}
								
							</div>			
								
						</>
						)
					)
				}
			</Carousel>
	  
		</>
	);
};


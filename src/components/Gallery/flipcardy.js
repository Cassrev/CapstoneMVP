import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./lightBGB.css"
import "bootstrap/dist/css/bootstrap.min.css";
import ReactCardFlip from 'react-card-flip';


import { DeleteButton} from "./deletebutn"
import { EditButton} from "./editbutn"
import { SubmitBox } from "../SubmitBox/SB"


//To continue flip card: https://medium.com/@amie.n.foster/flipping-out-how-to-create-a-card-that-flips-with-react-and-css-131dba54fc96
// another possibility? https://www.geeksforgeeks.org/design-a-flip-card-effect-using-reactjs/

export const FlipCardGBCaro = () =>{
	const navigate = useNavigate()


    const [isFlipped, setIsFlipped] = useState(false)

        const handleClick = () => {
            setIsFlipped(!isFlipped)
        }

	const [posts, setPost] = useState([])


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
	


	return (
		<>
			<SubmitBox />
			<Carousel showArrows={true} showThumbs={false}>
                
				{
					posts.map(
						(postObj) => (
						<>
						
							<div key={postObj.id} className="post-container">
                                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" 
								style={{height: "100%"}}>
									
									{/* FRONT CARD */}
									<div className="FrontCard" onClick={handleClick} style={{height: "100%"}}>
																												
												<img src={postObj.imgUrl} 
												style={{height: "100%",
												width: "auto"}} />
												<p className="caption">{postObj.captionText}</p>
									</div>
										
									{/* FRONT CARD ENDS HERE */}

									{/* BACK CARD */}
									<div className="BackCard" onClick={handleClick}>

										<DeleteButton id={postObj.id}/>
										<EditButton id={postObj.id} getAllPost={getAllPost} />
										
									</div>	
									{/* BACK CARD ENDS HERE */}
								
								</ReactCardFlip>
							</div>	
						
						</>
						)
					)
				}
			</Carousel>
	  
		</>
	);
};


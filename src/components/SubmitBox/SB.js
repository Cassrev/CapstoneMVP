import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SB.css"

export const SubmitBox = ({setGalleryPost}) => {
	let navigate = useNavigate()
	
	const localStorage_user = localStorage.getItem("toeBean_user")
	const user = JSON.parse(localStorage_user)
	
	const [posts, setPost] = useState({
		userId: user.id,
		submitDate: new Date(),
		beanTypeId: 0
	})

	const [bean, setBean] = useState([]);
	useEffect (() => {
		fetch(`http://localhost:8088/beanTypes`)
			.then(
				(response) => response.json()
			)
			.then(
				(convertedJSONDataBeanTypes) => {
					setBean(convertedJSONDataBeanTypes);
				}
			);
	}, []);


	const form = document.getElementById('my_form')
	const span = document.getElementById('my_preview')
	if(form) {
		form.addEventListener('submit',
			function handleSubmit(event){
				event.preventDefault();

				form.reset()
			}
		)
	};
	if(span) {
		span.addEventListener('submit',
			function handleSubmit(event){
				event.preventDefault();

				span.reset()
			}
		)
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(`yaaaa`)
  
		return fetch("http://localhost:8088/posts", 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(posts)
			}
		)
		.then(
			(response) => response.json()
		)
		.then(
			() => fetch(`http://localhost:8088/posts/`)
		)
		.then(
			response => response.json()
		)
		.then(
			(response) => setGalleryPost(response)
		)
	}
	
	const updatePost = (evt) => {
		const copy = { ...posts }
		copy[evt.target.id] = evt.target.value
		setPost(copy)
	}
	
	const handleIntegerInputChange = (event) => {
		const copyOfUserChoices = { ...posts };
		copyOfUserChoices[event.target.id] = parseInt(event.target.value);
		setPost(copyOfUserChoices);
	};

	const handleInputChange = (event) => {
		const copyOfUserChoices = { ...posts };
		copyOfUserChoices[event.target.id] = event.target.value;
		setPost(copyOfUserChoices);
	};

	return (
		<div className="form-background">
			<form className="form--post" id="my_form" onSubmit={handleSubmit}>
				<fieldset data-identifier="radio-button">
					<div className="form-group">
						{
							bean.map(
								(beanObj) => {
									return (
										<div key={beanObj.id} className="radio">
											<label>
												<input
													id="beanTypeId"
													type="radio"
													value={beanObj.id}
													checked={posts.beanTypeId === beanObj.id}
													onChange={handleIntegerInputChange}
												/>
												{beanObj.colorType}
											</label>
										</div>
									);
								}
							)
						}
					</div>
				</fieldset>
				<fieldset data-identifier="caption-box">
					<label htmlFor="caption">Caption your Bean</label>
					<input 
						onChange={updatePost}
						type="text" 
						id="captionText" 
						className="form-control"
						placeholder="Type Your Caption"
						required
					/>
				</fieldset>
				<fieldset data-identifier="file/image submit">
					<input
						className="form-control"
						type="text"
						id="imgUrl"
						value={setPost.imageUrl}
						onChange={handleInputChange} 
						placeholder="Bean Image Url"
						required
					/>
				</fieldset>
				<fieldset data-identifier="submit-button">
					<button 
					className= "btn"
					type="submit"> Submit Bean </button>
				</fieldset>
			</form>
		</div>
	)
}
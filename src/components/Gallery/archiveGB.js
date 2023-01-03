import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './GB.css'
import { SubmitBox } from "../SubmitBox/SB"

export const ArchivedGB = (currentUser) => {

  const [posts, setPost] = useState([])
  const [caption, setCaption] = useState({
      captionText: ""
  })

  const navigate = useNavigate()

  const localToeUser =  localStorage.getItem("toeBean_user")
  const toeUserObject = JSON.parse(localToeUser)

    useEffect(
        () => {
            getAllPost()
        },
        []
    )


  const getAllPost = () => {
        fetch(`http://localhost:8088/posts/`)
            .then(response => response.json())
            .then((postArray) => {
                setPost(postArray)
            })
    }

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

const updateCaption = (evt) => {
        const copy = {...caption}
        copy.captionText = evt.target.value
        // copy[evt.target.id] = evt.target.value
        setCaption(copy)
    }

   return (
 <>
  <SubmitBox />

    <div className="img-container">
        {posts.map(
          (postObj) => {
          return (
            <fieldset key={postObj.id} className="img-card">
                <button onClick={() => {
                     fetch(`http://localhost:8088/posts/${postObj.id}`, {
                     method: "DELETE",
                     })
                     .then(() => {
                     {getAllPost()}
                      }) 
                     }} className="deleteBTN"><img className="deleteBTNImg"
              src="https://i.imgur.com/EpO9onD.png"></img>
              </button>
              
        <Popup className="PopUP"
            trigger={<button className="EditBTN"> EDIT CAPTION </button>} 
              position="right center">
        <form className="caption_EDITFORM"> 
          <input onChange={updateCaption}
            type="text" 
            id="captionText" 
            className="form-EditCapt"
            placeholder="Caption Edit"/>
        </form>
    
      <button 
          onClick={(event) => {
            event.preventDefault(event)

                     fetch(`http://localhost:8088/posts/${postObj.id}`, {
                     method: "PATCH",
                     headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(caption)
                     }).then(response => response.json())
            .then(() => {
                {getAllPost()}
            })
                     }} 
            className="saveCapEdit">Save Edit</button>
        </Popup>
                     <div className="imgBox">
              <img
                className="img"
                src={postObj.imgUrl}
              />
              </div>
              <div className="overlay">{postObj.captionText}</div>

            </fieldset>
          );
        })}
      </div>
  </>
  )  
}
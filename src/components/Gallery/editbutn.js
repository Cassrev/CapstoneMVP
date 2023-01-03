import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import './GB.css'

export const EditButton = (props) => {
   const [posts, setPost] = useState([])
     const [caption, setCaption] = useState({
      captionText: ""
  })



    const updateCaption = (evt) => {
        const copy = {...caption}
        copy.captionText = evt.target.value
        // copy[evt.target.id] = evt.target.value
        setCaption(copy)
    }

    return (
    <>
            <fieldset>
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

                     fetch(`http://localhost:8088/posts/${props.id}`, {
                     method: "PATCH",
                     headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(caption)
                     }).then(response => response.json())
            .then(() => {
                {props.getAllPost()}
            })
                     }} 
            className="saveCapEdit">Save Edit</button>
       </Popup></fieldset>
      
          
    </>
    )
}
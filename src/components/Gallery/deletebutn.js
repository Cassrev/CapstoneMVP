import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './GB.css'

export const DeleteButton = (props) => {
  
return (
    <fieldset className="img-card">
        <button onClick={() => {
              fetch(`http://localhost:8088/posts/${props.id}`, {
              method: "DELETE",
              })
              .then(() => {
            {props.getAllPost()}
        })
      }} className="deleteBTN"><img className="deleteBTNImg"
      src="https://i.imgur.com/EpO9onD.png"></img>
      </button>
    </fieldset>
        
)
}

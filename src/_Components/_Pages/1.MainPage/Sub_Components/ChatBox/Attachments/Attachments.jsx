import React, { useState,useRef } from "react"

//STYLE IMPORTS
import "./Attachments.scss"

export default function Attachments({ state, handleImage }) {
  // const [post, setPost] = useState(null)
  const inputFile = useRef(null)

  const onButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };

  const fileUploadHandler = (e) => {
    console.log(e)
    // let formData = new FormData()
    // formData = e.target.files[0]
    const fileToRead = e.target.files[0]
    handleImage(fileToRead)
  }

  return (
    <div className="attachments" style={{ maxHeight: state ? "310px" : "0px" }}>
      <div className="media-icons">
        <i className="fas fa-video"></i>
      </div>
      <div className="media-icons">
        <i className="fas fa-user"></i>
      </div>
      <div className="media-icons">
        <i className="fas fa-file"></i>
      </div>
      <div className="media-icons">
        <i
          className="fas fa-camera"
          // onClick={(e) => {
          //   console.log("send picture")
          //   fileUploadHandler(e)
          // }}
        onClick={onButtonClick}></i>
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={fileUploadHandler}/>
      </div>
      <div className="media-icons">
        <i className="fas fa-image"></i>
      </div>
    </div>
  )
}

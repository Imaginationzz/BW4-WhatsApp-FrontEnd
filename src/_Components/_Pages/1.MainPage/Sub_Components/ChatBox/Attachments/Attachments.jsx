import React, { useState } from "react"

//STYLE IMPORTS
import "./Attachments.scss"

export default function Attachments({ state, handleImage }) {
  // const [post, setPost] = useState(null)

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
        ></i>
        <input id="file-input" type="file" onChange={fileUploadHandler} />
      </div>
      <div className="media-icons">
        <i className="fas fa-image"></i>
      </div>
    </div>
  )
}

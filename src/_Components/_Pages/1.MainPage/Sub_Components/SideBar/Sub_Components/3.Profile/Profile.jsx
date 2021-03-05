import React, { useState, useRef,useEffect } from 'react'
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import { Image } from "react-bootstrap"
import { MdEdit, MdDone, MdCameraAlt } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";
import "./ProfileEdit.scss"
import Headers from '../Headers/Headers';

function ProfileEdit({ state, functions }) {
    const inputFile = useRef(null)
    const userState = useSelector((state) => state.userState);
    const tokenState = useSelector((state) => state.tokenState);
    const [EditName, setEditName] = useState(false);
    const [EditBio, setEditBio] = useState(false)
    const [Name, setName] = useState(userState.user.username)
    const [Bio, setBio] = useState(userState.user.bio)
    const [Picture, setPicture] = useState(userState.user.picture)
    const [showPicker,setShowPicker]=useState("none")
    const dispatch = useDispatch();
    const sideState = useSelector((state) => state.sideBar);

    const updateName = async () => {
        await fetch("http://localhost:5000/users/profile", { method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenState.access_token.access_token
        },
        body: JSON.stringify({"username":Name})
        })
            .then(res => res.json())
            .then(json => console.log(json))
            alert(`Successfully Changed UserName to ${Name}`)
        setEditName(false)
    }

    const updateBio = async () => {
        await fetch("http://localhost:5000/users/profile", { method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenState.access_token.access_token
        },
        body: JSON.stringify({"bio":Bio})
        })
            .then(res => res.json())
            .then(json => console.log(json))
            alert(`Successfully Changed Bio to ${Bio}`)
        setEditBio(false)
    }
    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };

    const updatePicture = async (e)=>{
        const formData = new FormData();
        formData.append("image",e.target.files[0])
       try {
            const res = await axios.put("http://localhost:5000/users/profile/picture",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + tokenState.access_token.access_token
                }
            })
            setPicture(res.data.picture)
       } catch (error) {
           console.log(error)
       }
    }




    return (
        <div className="ProfileEdit" style={{ marginLeft: sideState === "profile" ? "" : "-100%" }}>
            <Headers title="Profile" functions={() => dispatch(setSide("sidebar"))} />
            <div className="EditPage">
                <div className="ProfilePicDiv">
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={updatePicture}/>
                    <Image className="ProfilePic" src={Picture} roundedCircle onClick={onButtonClick}  />
                    <div className="ImageOverlay">
                        <MdCameraAlt className="CameraIcon" />
                        <span> Change Profile Picture</span>
                    </div>
                </div>
                <div className="NameDiv">
                    <div className="NameHeader">
                        <p>Your Name</p>
                    </div>
                    <div className="NameContent">
                        <div className="Name">
                            {EditName ? <TextField id="standard-basic" defaultValue={Name} onChange={(event) => setName(event.target.value)} /> : <p>{Name}</p>}
                        </div>
                        <div className="EditIcon">
                            {EditName ? <div style={{display:"block ruby"}}><MdDone className="EditIcon" onClick={updateName} /></div> : <MdEdit className="EditIcon" onClick={() => setEditName(true)} />}
                        </div>
                    </div>
                </div>
                <div className="NameInfo">
                    <span>This is your Username. This Name is Visible to your WhatsApp Contacts.</span>
                </div>
                <div className="BioDiv">
                    <div className="BioHeader">
                        <p>Info</p>
                    </div>
                    <div className="BioContent">
                        <div className="Bio">
                            {EditBio ? <TextField id="standard-basic" defaultValue={Bio} onChange={(event) => setBio(event.target.value)} /> : <p>{Bio}</p>}
                        </div>
                        <div className="EditIcon">
                            {EditBio ? <MdDone className="EditIcon" onClick={updateBio} /> : <MdEdit className="EditIcon" onClick={() => setEditBio(true)} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit

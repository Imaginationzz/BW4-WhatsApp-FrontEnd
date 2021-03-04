import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { Image } from "react-bootstrap"
import { MdEdit, MdDone, MdCameraAlt } from "react-icons/md"
import { IoArrowBack } from "react-icons/io5"
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import "./ProfileEdit.scss"
import Headers from '../Headers/Headers';

function ProfileEdit({ state, functions }) {
    const userState = useSelector((state) => state.userState);
    const tokenState = useSelector((state) => state.tokenState);
    const [EditName, setEditName] = useState(false);
    const [EditBio, setEditBio] = useState(false)
    const [Name, setName] = useState(userState.user.username)
    const [Bio, setBio] = useState(userState.user.bio)
    const [Picture, setPicture] = useState(userState.user.picture)

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

    return (
        <div className="ProfileEdit" style={{ marginLeft: state === "profile" ? "" : "-100%" }}>
            <Headers title="Profile" functions={functions} />
            <div className="EditPage">
                <div className="ProfilePicDiv">
                    <Image className="ProfilePic" src={Picture} roundedCircle />
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
                            {EditName ? <MdDone className="EditIcon" onClick={updateName} /> : <MdEdit className="EditIcon" onClick={() => setEditName(true)} />}
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

import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { Image } from "react-bootstrap"
import { MdEdit,MdDone } from "react-icons/md"
import{IoArrowBack} from "react-icons/io5"
import "./ProfileEdit.css"

function ProfileEdit() {
    const [EditName, setEditName] = useState(false);
    const [EditBio,setEditBio]= useState(false)
    const [Name,setName] = useState("NamePlaceHolder")
    const [Bio,setBio]=useState("BioPlaceHolder")

    return (
        <>
            <div className="Header">
                <div className="HeaderContent">
                <div className="BackIconDiv">
                <IoArrowBack className="BackIcon"/>
                </div>
                <div className="HeaderText">
                    Profile
                </div>
                </div>
            </div>
            <div className="EditPage">
                <div className="ProfilePicDiv">
                    <Image className="ProfilePic" src="https://via.placeholder.com/200" roundedCircle />
                </div>
                <div className="NameDiv">
                    <div className="NameHeader">
                        <p>Your Name</p>
                    </div>
                    <div className="NameContent">
                        <div className="Name">
                            {EditName? <TextField id="standard-basic" defaultValue={Name} onChange={(event)=>setName(event.target.value)}/>:<p>{Name}</p>}
                        </div>
                        <div className="EditIcon">
                            {EditName?<MdDone className="EditIcon" onClick={()=>setEditName(false)}/>:<MdEdit className="EditIcon" onClick={()=>setEditName(true)}/>}
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
                        {EditBio? <TextField id="standard-basic" defaultValue={Bio} onChange={(event)=>setBio(event.target.value)}/>:<p>{Bio}</p>}
                        </div>
                        <div className="EditIcon">
                        {EditBio?<MdDone className="EditIcon" onClick={()=>setEditBio(false)}/>:<MdEdit className="EditIcon" onClick={()=>setEditBio(true)}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileEdit

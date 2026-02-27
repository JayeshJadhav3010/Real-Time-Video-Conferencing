import { Navigate, useNavigate } from "react-router-dom";
import withAuth from "./withAuth";
import { useContext, useState } from "react";
import { IconButton,Button,TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import "./App.css"

import { AuthContext } from "./AuthContext";

function HomeComponent(){

    let navigate=useNavigate();

    const [meetingCode,setMeetingCode]=useState();

    const{addToUserHistory}=useContext(AuthContext);
    let  handleJoinVideoCall=async()=>{
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
    return(
        <>
        <div className="navBar">
            <div style={{display:"flex"}}>
                <h3>Video Calling</h3>
            </div>
            <div style={{display:"flex", alignItems:"center"}}>
                <IconButton onClick={
                    ()=>{
                        navigate("/history")
                    }
                }>
                    <RestoreIcon/>
                </IconButton>
                <p>History</p>
                    <Button onClick={()=>{
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}> 
                        Logout
                    </Button>

            </div>
        </div>

        <div className="meetContainer">
            <div className="leftPanel">
                <div>
                    <h2>Providing Quality Video Call Just Like Quality Education</h2>
                    <div style={{display:"flex",gap:"10px"}}></div>
                    <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" size="small"/>
                    <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                </div>
            </div>
            <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
        </div>
        </>
    )
}

export default withAuth(HomeComponent);
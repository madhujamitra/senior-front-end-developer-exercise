import { useState, useEffect } from 'react'
import MyDropzone from './MyDropzone'
import axios from 'axios'
import './styles.css'

function UserProfiles() {
    const [userProfiles, setUserProfiles] = useState([]);

    const fetchUserProfiles = () => {
        axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
            console.log(res);
            setUserProfiles(res.data);
        });
    }

    useEffect(() => {
        fetchUserProfiles();
    }, []) //if anything changes trigger again    

    return (
        <>
            {userProfiles.map((userProfile: any, index) => (
                <div key={index} className="user-profile">
                    {userProfile.userProfileID
                        && <img src={`http://localhost:8080/api/v1/user-profile/${userProfile.userProfileID}/image/download`} alt="profile" />}
                    <br />
                    <br />
                    <h1>{userProfile.username}</h1>
                    <p>{userProfile.userProfileID}</p>
                    <MyDropzone {...userProfile} />
                    <br />
                </div>
            ))}
        </>
    )
}

export default UserProfiles

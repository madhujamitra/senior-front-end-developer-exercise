import { useEffect } from 'react'

import './styles.css'

 // Use the provided image URL

interface UserProfile {
  userProfileID: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profileImage: string;
  bio?: string;
}

function UserProfiles({ user }: { user: UserProfile }) {
    useEffect(() => {}, [user]);
    return (
        <div className="user-profile">
            <img src={user.profileImage} alt="profile" />
            <br />
            <br />
            <h1>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}</h1>
            {user.bio && <p className="bio">{user.bio}</p>}

            <br />
        </div>
    )
}

export default UserProfiles

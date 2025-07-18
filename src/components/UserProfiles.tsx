import { UI_TEXT } from '../constants';
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
    return (
        <div className="user-profile">
            <img src={user.profileImage} alt={UI_TEXT.altText.profile} />
            <br />
            <br />
            <h1>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}</h1>
            {user.bio && <p className="bio">{user.bio}</p>}

            <br />
        </div>
    )
}

export default UserProfiles

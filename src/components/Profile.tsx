import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Profile() {
  const userState = useSelector((state: RootState) => state.user.user);

  return <div className="profile">Agent Name: {userState.agentName}</div>;
}

export default Profile;

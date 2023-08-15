interface ProfileProps {
  agentDetails: any;
}

function Profile(props: ProfileProps) {
  return <div className="profile">agentDetails: {props.agentDetails}</div>;
}

export default Profile;

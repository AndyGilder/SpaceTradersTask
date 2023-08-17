import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  const [storageApiKey, setStorageApiKey] = useState({
    token: "",
    agentName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey: any = localStorage.getItem("apiKey");

    if (apiKey) {
      setStorageApiKey({
        token: JSON.parse(apiKey).token,
        agentName: JSON.parse(apiKey).agentName,
      });
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("apiKey");
  };

  return (
    <nav className="top-nav">
      {storageApiKey.token && (
        <>
          <button onClick={() => navigate("/")}>Profile</button>
          <button onClick={logOut}>Log out</button>
        </>
      )}
    </nav>
  );
}

export default Nav;

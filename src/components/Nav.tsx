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

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="top-nav">
      {localStorage.getItem("apiKey") && (
        <>
          <button onClick={() => navigate("/")}>Profile</button>
          <button onClick={logOut}>Log out</button>
        </>
      )}
    </nav>
  );
}

export default Nav;

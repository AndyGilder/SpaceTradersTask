import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setUserState } from "./slices/userSlice";
import { setAgentDetailsState } from "./slices/agentDetailsSlice";

import NewGame from "./components/NewGame";
import Profile from "./components/Profile";
import Nav from "./components/Nav";

import "./App.css";

function App() {
  const [storageApiKey, setStorageApiKey] = useState({
    token: "",
    agentName: "",
  });
  const userState = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiKey: any = localStorage.getItem("apiKey");

    if (apiKey) {
      setStorageApiKey({
        token: JSON.parse(apiKey).token,
        agentName: JSON.parse(apiKey).agentName,
      });

      if (JSON.parse(apiKey).token) {
        getUser(JSON.parse(apiKey).token);
      }
    }
  }, []);

  const getUser = async (token: string) => {
    const response = await fetch(`https://api.spacetraders.io/v2/my/agent`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    dispatch(
      setUserState({
        token: token,
        agentName: json.data.symbol,
      })
    );

    dispatch(
      setAgentDetailsState({
        agentName: json.data.symbol,
        credits: json.data.credits,
        headquarters: json.data.headquarters,
        startingFaction: json.data.startingFaction,
      })
    );
  };

  return (
    <div className="app-container">
      {userState.token?.length === 0 ||
      userState.agentName?.length === 0 ||
      storageApiKey.token?.length === 0 ||
      storageApiKey.agentName?.length === 0 ? (
        <NewGame />
      ) : (
        <>
          <Nav />
          <div className="app-main">
            <Profile />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

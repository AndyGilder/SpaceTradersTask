import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setUserState } from "./slices/userSlice";

import NewGame from "./components/NewGame";
import Profile from "./components/Profile";
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
    }

    if (JSON.parse(apiKey).token) {
      console.log(JSON.parse(apiKey).token);
      getUser(JSON.parse(apiKey).token);
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
  };

  return (
    <>
      {userState.token?.length === 0 ||
      userState.agentName?.length === 0 ||
      storageApiKey.token?.length === 0 ||
      storageApiKey.agentName?.length === 0 ? (
        <NewGame />
      ) : (
        <Profile />
      )}
    </>
  );
}

export default App;

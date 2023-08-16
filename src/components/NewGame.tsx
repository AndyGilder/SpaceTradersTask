import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../slices/userSlice";
import { RootState } from "../store/store";

import "./NewGame.scss";

/**
 * This component is a basic MVP of part one of the quickstart. It handles registering your agent and receives a token
 * which you will need to use in subsequent calls. Therefore, you might want to refactor or replace this as you move forward.
 */

function NewGame() {
  const [token, setToken] = useState();
  const [resp, setResp] = useState("");
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" });
  const dispatch = useDispatch();
  const agentName = useSelector(
    (state: RootState) => state.user.user.agentName
  );

  const submitNewGame = async () => {
    const resp = await fetch("https://api.spacetraders.io/v2/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: form.symbol,
        faction: form.faction,
      }),
    });

    const json = await resp.json();

    if (resp.ok) {
      setToken(json.data.token);

      dispatch(
        setUserState({
          token: json.data.token,
          agentName: json.data.agent.symbol,
        })
      );

      localStorage.setItem(
        "apiKey",
        JSON.stringify({
          agentName: json.data.agent.symbol,
          token: json.data.token,
        })
      );
    }

    setResp(JSON.stringify(json, null, 2));
  };

  return (
    <>
      <h1>Start a New Game</h1>
      <div className="new-game__input-container">
        <label>Symbol:</label>
        <input
          name="symbol"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })}
        />

        <label>Faction:</label>
        <input
          name="faction"
          value={form.faction}
          onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })}
        />

        <input type="submit" onClick={submitNewGame} />
      </div>

      {agentName && <span>Welcome, Commander {agentName}!</span>}
    </>
  );
}

export default NewGame;

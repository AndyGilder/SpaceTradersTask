import { useState } from "react";
import "./WaypointDetails.scss";
import AvailableShipDetails from "./AvailableShipDetails";

interface WaypointDetailsProps {
  waypoint: any;
  token: string;
}

function WaypointDetails(props: WaypointDetailsProps) {
  const [availableShips, setAvailableShips] = useState({
    symbol: "",
    ships: [],
  });
  const [showAvailableShips, setShowAvailableShips] = useState(false);

  const viewAvailableShips = async (
    systemSymbol: string,
    waypointSymbol: string
  ) => {
    if (showAvailableShips) {
      setShowAvailableShips(false);
      return;
    }

    const url = `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });

    const json = await response.json();

    setAvailableShips(json.data);
    setShowAvailableShips(true);
  };

  return (
    <div className="waypoint-details">
      <div className="waypoint-details__symbol">{props.waypoint.symbol}</div>
      <div>Type: {props.waypoint.type}</div>
      <div>
        {`Has shipyard? ${
          props.waypoint.traits.some(
            (trait: any) => trait.symbol === "SHIPYARD"
          )
            ? "Yes"
            : "No"
        }`}
      </div>
      <div>
        {props.waypoint.traits.some(
          (trait: any) => trait.symbol === "SHIPYARD"
        ) ? (
          <button
            onClick={() =>
              viewAvailableShips(
                props.waypoint.systemSymbol,
                props.waypoint.symbol
              )
            }
          >
            {showAvailableShips ? "Hide ships" : "View available ships"}
          </button>
        ) : (
          ""
        )}
      </div>

      <div>
        {availableShips?.ships.length > 0 &&
          showAvailableShips &&
          availableShips?.ships.map((ship: any, index: number) => (
            <AvailableShipDetails
              ship={ship}
              waypoint={availableShips?.symbol}
              token={props.token}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default WaypointDetails;

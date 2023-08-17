import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./ShipDetails.scss";
import WaypointDetails from "./WaypointDetails";

function ShipDetails() {
  const location: any = useLocation();
  const { ship, token } = location.state;
  const [shipStatus, setShipStatus] = useState("");
  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    if (ship.nav) {
      setShipStatus(ship.nav.status);
      getWaypointsInSystem();
    }
  }, [ship]);

  const moveToOrbit = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/orbit`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    setShipStatus(json.data.nav.status);
  };

  const getWaypointsInSystem = async () => {
    const url = `https://api.spacetraders.io/v2/systems/${ship.nav.systemSymbol}/waypoints`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    setWaypoints(json.data);
  };

  return (
    <div className="ship-details">
      <h1>{ship?.symbol}</h1>

      <h4>Current status:</h4>
      <span>{shipStatus}</span>

      <h4>Current system:</h4>
      <span>{ship?.nav.systemSymbol}</span>

      <h4>Current waypoint:</h4>
      <span>{ship?.nav.waypointSymbol}</span>

      {ship?.nav.status !== "IN_ORBIT" && (
        <button className="ship-details__orbit-command" onClick={moveToOrbit}>
          Command ship to move to orbit
        </button>
      )}

      <h4>List of waypoints in current system:</h4>
      {waypoints?.map((waypoint: any, index: number) => (
        <WaypointDetails waypoint={waypoint} token={token} key={index} />
      ))}
    </div>
  );
}

export default ShipDetails;

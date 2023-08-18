import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import WaypointDetails from "./WaypointDetails";

import "./ShipDetails.scss";

function ShipDetails() {
  const location: any = useLocation();
  const { ship, token } = location.state;
  const [shipStatus, setShipStatus] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [shipDetails, setShipDetails]: any = useState({});

  useEffect(() => {
    if (ship.nav) {
      getShipDetails();
      setShipStatus(ship.nav.status);
      getWaypointsInSystem();
    }
  }, [ship]);

  const getShipDetails = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}`;
    let response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setShipDetails(json.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const moveToOrbit = async () => {
    const url = `https://api.spacetraders.io/v2/my/ships/${ship.symbol}/orbit`;

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getShipDetails();
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
      <h1>{shipDetails?.symbol}</h1>

      <h4>Current status:</h4>
      <span>{shipDetails?.nav?.status}</span>

      <h4>Current system:</h4>
      <span>{shipDetails?.nav?.systemSymbol}</span>

      <h4>Current waypoint:</h4>
      <span>{shipDetails?.nav?.waypointSymbol}</span>

      {shipDetails?.nav?.status !== "IN_ORBIT" && (
        <button className="ship-details__orbit-command" onClick={moveToOrbit}>
          Command ship to move to orbit
        </button>
      )}

      <h4>List of waypoints in current system:</h4>
      {waypoints?.map((waypoint: any, index: number) => (
        <WaypointDetails waypoint={waypoint} token={token} key={index} />
      ))}

      <ToastContainer />
    </div>
  );
}

export default ShipDetails;

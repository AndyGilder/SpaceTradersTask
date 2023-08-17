import { ToastContainer, toast } from "react-toastify";

import "./AvailableShipDetails.scss";

interface AvailableShipDetailsProps {
  ship: any;
  waypoint: string;
  token: string;
}

function AvailableShipDetails(props: AvailableShipDetailsProps) {
  const purchaseShip = async (ship: any) => {
    const toastConfig: any = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    };

    try {
      const url = "https://api.spacetraders.io/v2/my/ships";
      const response: any = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipType: ship.type,
          waypointSymbol: props.waypoint,
        }),
      });

      if (response.ok) {
        toast.success(`Successfully purchased ${ship.type}`, toastConfig);
      } else {
        const json = await response.json();
        toast.error(json.error.message, toastConfig);
      }
    } catch (error: any) {
      toast.error(error.message, toastConfig);
    }
  };

  return (
    <div className="available-ship-details">
      <div>Type: {props.ship.type}</div>
      <div>Name: {props.ship.name}</div>
      <div>{props.ship.description}</div>
      <div>
        Purchase price: <b>{props.ship.purchasePrice.toLocaleString()}</b>
      </div>
      <button onClick={() => purchaseShip(props.ship)}>
        Purchase {props.ship.name}
      </button>
      <ToastContainer />
    </div>
  );
}

export default AvailableShipDetails;

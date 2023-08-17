import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./Profile.scss";
import ContractDetails from "./ContractDetails";

function Profile() {
  const userState = useSelector((state: RootState) => state.user.user);
  const agentDetails = useSelector(
    (state: RootState) => state.agentDetails.agentDetails
  );

  const [shipDetails, setShipDetails]: any = useState({});

  useEffect(() => {
    getShipDetails();
  }, []);

  const getShipDetails = async () => {
    const url = "https://api.spacetraders.io/v2/my/ships";
    let response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userState.token}`,
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

  return (
    <div className="profile">
      <section className="profile__grid-item">
        <h3>Welcome, Commander</h3>
        <h2>{agentDetails.agentName}</h2>

        <div className="profile__inner-item">
          <span>Headquarters: {agentDetails.headquarters}</span>
        </div>

        <div className="profile__inner-item">
          <span>Ships:</span>
          {shipDetails.length > 0 &&
            shipDetails?.map((ship: any, index: number) => (
              <Link
                to="/shipDetails"
                state={{ ship: ship, token: userState.token }}
                key={index}
                className="profile__ship-details-link"
              >
                {ship.symbol}
              </Link>
            ))}
        </div>
      </section>

      <section className="profile__grid-item">
        <ContractDetails token={userState.token} />
      </section>

      <section className="profile__grid-item">
        <h2>Credits: {agentDetails.credits.toLocaleString()}</h2>
      </section>

      <ToastContainer />
    </div>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../store/store";

import "./Profile.scss";

function Profile() {
  const userState = useSelector((state: RootState) => state.user.user);
  const agentDetails = useSelector(
    (state: RootState) => state.agentDetails.agentDetails
  );

  const [contractDetails, setContractDetails]: any = useState({});

  useEffect(() => {
    getContractDetails();
  }, []);

  const getContractDetails = async () => {
    const url = "https://api.spacetraders.io/v2/my/contracts";

    const response = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    });

    const json = await response.json();

    console.log(json.data);

    setContractDetails(json.data);
  };

  return (
    <div className="profile">
      <section className="profile__grid-item">
        <h3>Welcome, Commander</h3>
        <h2>{agentDetails.agentName}</h2>

        <div className="profile__inner-item">
          <span>Headquarters: {agentDetails.headquarters}</span>
        </div>
      </section>

      <section className="profile__grid-item">
        <h2>Current contracts:</h2>

        {contractDetails.length > 0 &&
          [...contractDetails]?.map((item: any, index: number) => (
            <section key={index}>
              <div>Contract Type: {item.type}</div>
              <div>Faction: {item.factionSymbol}</div>
              <div>
                Deadline:
                {moment(item.terms.deadline).format("Do MMMM YYYY HH:mm")}
              </div>
              <div>
                Status: {item.accepted ? "Accepted" : "Not yet accepted"}
              </div>
              {item.fulfilled ? <div>Fulfilled: Contract fulfilled</div> : ""}
              <div>
                Payment on fulfillment: {item.terms.payment.onFulfilled} credits
              </div>

              <div>
                Terms:
                {item.terms.deliver.map(
                  (deliveryTerm: any, innerIndex: number) => (
                    <div key={innerIndex}>
                      <div>{`Deliver ${deliveryTerm.unitsRequired} units of ${deliveryTerm.tradeSymbol} to ${deliveryTerm.destinationSymbol}`}</div>
                      <div>{`Current amount delivered: ${deliveryTerm.unitsFulfilled}`}</div>
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
      </section>

      <section className="profile__grid-item">
        <h2>Credits: {agentDetails.credits}</h2>
      </section>
    </div>
  );
}

export default Profile;

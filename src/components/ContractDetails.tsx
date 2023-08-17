import { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import "./ContractDetails.scss";

interface ContractDetailsProps {
  token: string;
}

function ContractDetails(props: ContractDetailsProps) {
  const [contractDetails, setContractDetails]: any = useState({});

  useEffect(() => {
    getContractDetails();
  }, []);

  const getContractDetails = async () => {
    const url = "https://api.spacetraders.io/v2/my/contracts";

    const response = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });

    const json = await response.json();

    setContractDetails(json.data);
  };

  const acceptContract = async (contractId: string) => {
    const url = `https://api.spacetraders.io/v2/my/contracts/${contractId}/accept`;
    let response: any;

    const toastConfig: any = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    };

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      if (response.ok) {
        toast.success("Contract successfully accepted!", toastConfig);
      }
    } catch (error: any) {
      toast.error(error.message, toastConfig);
    }
  };

  return (
    <>
      <h2>Current contracts:</h2>

      {contractDetails.length > 0 &&
        [...contractDetails]?.map((item: any, index: number) => (
          <section key={index} className="contract-details__contract">
            <div>Contract Type: {item.type}</div>
            <div>Status: {item.accepted ? "Accepted" : "Not yet accepted"}</div>
            <hr />
            <div>Faction: {item.factionSymbol}</div>
            <div>
              {`Deadline: ${moment(item.terms.deadline).format(
                "Do MMMM YYYY, HH:mm"
              )}`}
            </div>
            {item.fulfilled ? <div>Fulfilled: Contract fulfilled</div> : ""}
            <div>
              Payment on fulfillment:{" "}
              {item.terms.payment.onFulfilled.toLocaleString()} credits
            </div>

            <hr />

            <div>
              Terms:
              {item.terms.deliver.map(
                (deliveryTerm: any, innerIndex: number) => (
                  <div key={innerIndex}>
                    <div>{`Deliver ${deliveryTerm.unitsRequired.toLocaleString()} units of ${
                      deliveryTerm.tradeSymbol
                    } to ${deliveryTerm.destinationSymbol}`}</div>
                    <div>{`Current amount delivered: ${deliveryTerm.unitsFulfilled.toLocaleString()}`}</div>
                  </div>
                )
              )}
            </div>

            {!item.accepted && (
              <button
                className="contract-details__accept-contract"
                onClick={() => acceptContract(item.id)}
              >
                Accept this contract
              </button>
            )}
          </section>
        ))}

      <ToastContainer />
    </>
  );
}

export default ContractDetails;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import useEcomStore from "../../store/ecom-store";

import CheckoutForm from "../../components/CheckoutForm";
import { payment } from "../../APIs/stripe";

const stripePromise = loadStripe(
  "pk_test_51QD4cRLJcTYHG30MgQsZQtbCcnPO0RWcaE3OoSyIyf1BKFbq4mFaE4tMoN4IjJl3pv9IRhmfUmLTjd0e4hhfPc12004RwCL9og"
);

export default function Payment() {
  const token = useEcomStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BadgeDollarSign } from "lucide-react";
import React, { useState } from "react";

const PaymentForm = ({ todayPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log(error);
    } else {
      setError("");
      console.log('paymentMethod',paymentMethod);
    }
  };

  return (
    <div>
      <form
        onClick={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
      >
        <CardElement
          className="p-2 border border-gray-300 rounded"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        {/* Pay Now */}
        <button
          type="submit"
          disabled={!stripe}
          className="btn w-full bg-green-500 hover:bg-green-600 text-white border-none"
        >
          <BadgeDollarSign className="mr-2" />
          Pay ৳{todayPrice} Now
        </button>
        {
          error && <p className="text-red-500"> {error} </p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;

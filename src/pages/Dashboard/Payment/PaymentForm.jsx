import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BadgeDollarSign } from "lucide-react";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const PaymentForm = ({ todayPrice, product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const amountInCents = todayPrice * 100;
  const parcelId = product._id;

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
    } else {
      setError("");
      console.log("paymentMethod", paymentMethod);

      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;

          const paymentData = {
            parcelId,
            transactionId,
            todayPrice,
            paidBy: user.email,
            productName: product.itemName,
            marketName: product.marketName,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My Parcels",
            });
            navigate("/dashboard/orders");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Payment could not be saved. Please try again.",
            });
          }
        }
      }
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
        {error && <p className="text-red-500"> {error} </p>}
      </form>
    </div>
  );
};

export default PaymentForm;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  X,
  BadgeDollarSign,
  Mail,
  User,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import PaymentForm from "../../pages/Dashboard/Payment/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PurchaseModal = ({ isOpen, setIsOpen, product }) => {
  const { user } = useAuth();

  const {
    image,
    itemName,
    pricePerUnit,
    historicalPrices,
    marketName,
    date,
    vendorName,
    vendorEmail,
    itemDescription,
  } = product || {};

  const todayPrice = historicalPrices?.[0]?.price || pricePerUnit;

  const closeModal = () => setIsOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Purchase Summary</h3>
                  <button onClick={closeModal}>
                    <X className="text-white hover:text-red-400" />
                  </button>
                </div>

                {/* Product Image */}
                <div className="mb-4">
                  <img
                    src={image}
                    alt={itemName}
                    className="w-full h-48 object-cover rounded-xl border border-white/20 shadow"
                  />
                </div>

                {/* Product & Market Info */}
                <div className="space-y-2 mb-4">
                  <p>
                    <span className="font-semibold">🧾 Product:</span>{" "}
                    {itemName}
                  </p>
                  <p>
                    <span className="font-semibold">💸 Price per Unit:</span> ৳
                    {pricePerUnit}
                  </p>
                  <p>
                    <span className="font-semibold">📈 Today's Price:</span> ৳
                    {todayPrice}
                  </p>
                  <p>
                    <span className="font-semibold">🏬 Market:</span>{" "}
                    {marketName}
                  </p>
                  <p>
                    <span className="font-semibold">📅 Date:</span> {date}
                  </p>
                </div>

                {/* Vendor Info */}
                <div className="space-y-2 mb-4">
                  <p>
                    <span className="font-semibold">🧑 Vendor:</span>{" "}
                    {vendorName}
                  </p>
                  <p className="break-all">
                    <span className="font-semibold">✉️ Vendor Email:</span>{" "}
                    {vendorEmail}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-200">
                    <span className="font-semibold">📝 Description:</span>{" "}
                    {itemDescription}
                  </p>
                </div>

                {/* Customer Info */}
                <div className="space-y-1 text-sm text-gray-300 mb-6">
                  <p>
                    <User className="inline w-4 h-4 mr-1" />
                    Customer: {user?.displayName}
                  </p>
                  <p>
                    <Mail className="inline w-4 h-4 mr-1" />
                    Your Email: {user?.email}
                  </p>
                </div>

                {/* Payment */}
                <Elements stripe={stripePromise}>
                  <PaymentForm todayPrice={todayPrice} product={product}/>
                </Elements>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;

import { useState } from "react";
import useRejectProduct from "../../hooks/useRejectProduct";

const RejectModal = ({ isOpen, onClose, productId }) => {
  const [feedback, setFeedback] = useState("");
  const { mutate: rejectProduct, isLoading } = useRejectProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    rejectProduct({ productId, feedback });
    setFeedback("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Reject Product</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border p-2 rounded-md"
            rows="4"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectModal;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "./useAxiosSecure";

const useRejectProduct = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, feedback }) => {
      const res = await axiosSecure.patch(`/products/reject/${productId}`, {
        status: "Rejected",
        feedback,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product rejected with feedback!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Rejection failed.");
    },
  });
};

export default useRejectProduct;

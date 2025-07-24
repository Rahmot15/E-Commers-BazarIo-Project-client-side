import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "./useAxiosSecure";

const useApproveProduct = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await axiosSecure.patch(`/products/status/${productId}`, {
        status: "Approved",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product Approved!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Approval failed.");
    },
  });
};

export default useApproveProduct;

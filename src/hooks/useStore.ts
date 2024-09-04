import { useContext } from "react";
import { StoreContext } from "@/store/provider";

export const useStores = () => {
  return useContext(StoreContext);
};

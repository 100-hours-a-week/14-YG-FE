import { useQuery } from "@tanstack/react-query";
import { confirmAccount } from "../../api/user";

export const useCheckAccountQuery = () => {
  return useQuery({
    queryKey: ["checkAccount"],
    queryFn: () => confirmAccount(),
  });
};

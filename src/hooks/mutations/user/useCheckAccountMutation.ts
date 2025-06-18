import { useMutation } from "@tanstack/react-query";
import { ConfirmAccountParams } from "../../../types/userType";
import { confirmAccount } from "../../../api/user";

export const useCheckAccountMutation = () => {
  return useMutation<string, Error, ConfirmAccountParams>({
    mutationFn: confirmAccount,
  });
};

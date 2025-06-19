import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ConfirmAccountParams } from "../../../types/userType";
import { confirmAccount } from "../../../api/user";

export const useCheckAccountMutation = (
  options?: UseMutationOptions<string, Error, ConfirmAccountParams>
) => {
  return useMutation<string, Error, ConfirmAccountParams>({
    mutationFn: confirmAccount,
    ...options,
  });
};

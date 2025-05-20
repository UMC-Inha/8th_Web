import { useMutation } from "@tanstack/react-query";
import { withdrawUser } from "../../apis/user";

export const useWithdrawUser = () =>
  useMutation({ mutationFn: withdrawUser });
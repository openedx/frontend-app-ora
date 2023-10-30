import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ActionMutationFunction } from '../../types';

export const useCreateMutationAction = (mutationFn: ActionMutationFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (...args) => mutationFn(...args, queryClient),
  });
};

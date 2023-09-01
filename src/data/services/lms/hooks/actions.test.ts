import { useQueryClient, useMutation } from '@tanstack/react-query';
import { when } from 'jest-when';

import { createMutationAction } from './actions';

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

describe('actions', () => {
  const queryClient = { setQueryData: jest.fn() };

  when(useQueryClient).mockReturnValue(queryClient);
  when(useMutation).mockImplementation(({ mutationFn }) => {
    return {
      mutate: mutationFn,
    };
  });

  describe('createMutationAction', () => {
    it('returns a mutation function', () => {
      const aribtraryMutationFn = jest.fn();
      const mutation = createMutationAction(aribtraryMutationFn) as any;

      mutation.mutate('foo', 'bar');
      expect(aribtraryMutationFn).toHaveBeenCalledWith('foo', 'bar', queryClient);
    });
  });
});

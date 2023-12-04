import { useQueryClient, useMutation } from '@tanstack/react-query';
import { when } from 'jest-when';
import { useCreateMutationAction } from './utils';

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

describe.skip('actions', () => {
  const queryClient = { setQueryData: jest.fn() };

  when(useQueryClient).mockReturnValue(queryClient);
  when(useMutation).mockImplementation(({ mutationFn }) => {
    return {
      mutate: mutationFn,
    };
  });

  describe('createMutationAction', () => {
    it('returns a mutation function', () => {
      const arbitraryMutationFn = jest.fn();
      const mutation = useCreateMutationAction(arbitraryMutationFn) as any;

      mutation.mutate('foo', 'bar');
      expect(arbitraryMutationFn).toHaveBeenCalledWith('foo', 'bar', queryClient);
    });
  });
});

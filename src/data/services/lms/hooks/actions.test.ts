import { useQueryClient, useMutation } from '@tanstack/react-query';
import { when } from 'jest-when';
import { useCreateMutationAction } from './actions';

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
      const aribtraryMutationFn = jest.fn();
      const mutation = useCreateMutationAction(aribtraryMutationFn) as any;

      mutation.mutate('foo', 'bar');
      expect(aribtraryMutationFn).toHaveBeenCalledWith('foo', 'bar', queryClient);
    });
  });
});

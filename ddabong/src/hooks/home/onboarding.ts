import { components } from '@/types/openapi';
import { useMutation } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

type UserOnboardingRequestDTO =
  components['schemas']['UserOnboardingRequestDTO'];

export async function postUpdateUserOnboarding(
  body: UserOnboardingRequestDTO
): Promise<void> {
  const { error } = await privateClient.POST('/users/onboarding', { body });
  if (error) throw error;
}

export function useUpdateUserOnboarding() {
  return useMutation({
    mutationFn: postUpdateUserOnboarding,
    onSuccess: () => {
      localStorage.setItem('firstLogin', 'false');
    },
  });
}

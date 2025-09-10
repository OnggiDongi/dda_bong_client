import type { operations } from '@/types/openapi';
import { useMutation } from '@tanstack/react-query';
import { publicClient } from '@/lib/openapi-client';

export type SignUpBody =
  operations['signUser_1']['requestBody']['content']['application/json'];

type SignUpOk =
  operations['signUser_1']['responses']['200']['content']['application/json'];

export function useInstitutionSignUp() {
  return useMutation({
    mutationFn: async (payload: SignUpBody) => {
      const { data, error } = await publicClient.POST('/institutions/signup', {
        body: payload,
      });

      if (error) {
        const status = error.httpStatus;

        if (status === '409 CONFLICT') {
          try {
            const msg = error.message ?? '이미 존재하는 기관입니다.';
            throw new Error(msg);
          } catch {
            throw new Error('이미 존재하는 기관입니다.');
          }
        }
        if (error.errorCode === 302) {
          return 'conflict';
        } else {
          return 'fail';
        }
      }

      return data as SignUpOk;
    },
  });
}

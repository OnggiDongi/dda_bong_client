// src/hooks/mutations/useInstitutionSignUp.ts
import type { operations, components } from '@/types/openapi';
import { useMutation } from '@tanstack/react-query';
import { publicClient } from '@/lib/openapi-client';

// 요청 바디 타입 (확실함)
export type SignUpBody =
  operations['signUser_1']['requestBody']['content']['application/json'];
// = components['schemas']['InstitutionRequestDTO']

// 성공 응답은 스펙상 unknown
type SignUpOk =
  operations['signUser_1']['responses']['200']['content']['application/json'];
// = unknown

// 409 충돌 에러 바디
type ConflictErr =
  operations['signUser_1']['responses']['409']['content']['application/json'];
// = components['schemas']['ConflictException']

// (선택) 성공 응답을 임시로 좁혀 쓰고 싶다면 이렇게 커스텀 타입을 둡니다.
// 실제 서버가 내려주는 필드를 아는 경우에만!
// type SignUpOkNarrow =
//   | { success: true; id: number; name: string } // 예시
//   | { success: true; message: string }; // 예시

export function useInstitutionSignUp() {
  return useMutation({
    mutationFn: async (payload: SignUpBody) => {
      const { data, error } = await publicClient.POST('/institutions/signup', {
        body: payload,
      });

      if (error) {
        // 상태코드별 에러 바디 파싱
        const status = error.httpStatus;

        if (status === '409 CONFLICT') {
          try {
            const conflict = error as ConflictErr | undefined;
            // // ConflictException에 메시지 필드가 있다면
            const msg =
              //   (conflict as any)?.message ??
              //   (conflict as any)?.error ??
              error.message ?? '이미 존재하는 기관입니다.';
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

        // 그 외 에러
        // throw new Error(error.message ?? '회원가입에 실패했습니다.');
      }

      // data는 스펙상 unknown
      return data as SignUpOk; // 필요시 여기서 SignUpOkNarrow로 캐스팅해도 됨
    },
  });
}

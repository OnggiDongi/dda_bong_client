// hooks/mypage/updateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    // FormData 그대로 받습니다.
    mutationFn: async (form: FormData) => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
        {
          method: 'PATCH',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          // Content-Type 지정하지 마세요. (FormData면 브라우저가 알아서 설정)
          body: form,
        }
      );

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(`Update failed: ${res.status} ${msg}`);
      }
      return res.json().catch(() => null); // 서버가 바디 안 주면 null
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

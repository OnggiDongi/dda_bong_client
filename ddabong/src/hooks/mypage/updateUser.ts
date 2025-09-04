import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
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
          body: form,
        }
      );

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(`Update failed: ${res.status} ${msg}`);
      }
      return res.json().catch(() => null);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

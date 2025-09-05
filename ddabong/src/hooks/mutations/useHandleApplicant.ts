import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

async function approveApplicant(applicantId: number) {
  const { error } = await privateClient.POST('/apply/{applicantId}/accept', {
    params: {
      path: {
        applicantId: applicantId,
      },
    },
  });
  if (error) throw error;
}

async function rejectApplicant(applicantId: number) {
  const { error } = await privateClient.POST('/apply/{applicantId}/reject', {
    params: {
      path: {
        applicantId: applicantId,
      },
    },
  });
  if (error) throw error;
}

export function useApproveApplicant(activityPostId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getApplicants', activityPostId],
      });
    },
  });
}

export function useRejectApplicant(activityPostId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getApplicants', activityPostId],
      });
    },
  });
}

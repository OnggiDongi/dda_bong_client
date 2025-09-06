'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchDetailedActivityPost } from '@/hooks/admin/activity';
import { useDeleteActivityMutation } from '@/hooks/mutations/useActivityMutations';
import ApplyBody from '@/components/apply/ApplyBody';
import ApplyFooter from '@/components/apply/ApplyFooter';
import type { DetailedActivityPost } from '@/types/activity';

export default function RecruitDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const activityPostId = Number(id);

  const { data: post, isLoading, error } = useQuery<DetailedActivityPost>({
    queryKey: ['activityPost', activityPostId],
    queryFn: () => fetchDetailedActivityPost(activityPostId),
    enabled: !!activityPostId,
  });

  const deleteMutation = useDeleteActivityMutation();

  const handleDelete = () => {
    deleteMutation.mutate(activityPostId, {
      onSuccess: () => {
        router.push('/admin/recruit');
      },
    });
  };

  const handleEdit = () => {
    router.push(`/admin/recruit/write/${activityPostId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    console.error('Error loading post:', error);
    return <div>Error loading post.</div>;
  }

  return (
    <>
      <div className='flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <ApplyBody post={post} />
      </div>
      <ApplyFooter
        isApply={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}

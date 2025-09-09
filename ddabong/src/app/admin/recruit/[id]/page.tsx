import RecruitDetail from '@/components/admin/recruit/RecruitDetail';
import ApplyHeader from '@/components/apply/ApplyHeader';

export default function RecruitDetailPage() {
  return (
    <main className='flex h-dvh flex-col bg-white'>
      <ApplyHeader />
      <RecruitDetail />
    </main>
  );
}

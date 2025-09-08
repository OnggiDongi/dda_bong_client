import ActivityInfo from '@/components/ActivityInfo';
import Txt from '@/components/atoms/Text';
import { components } from '@/types/openapi';

type ApplicantReviewResponseDTO =
  components['schemas']['ApplicantReviewResponseDTO'];

type Props = {
  title: string;
  endDate: string;
  category: string;
  imageUrl: string;
  recruitNum: number;
  applicants: ApplicantReviewResponseDTO[];
};

export default function ActivityApplyInfo({
  title,
  endDate,
  category,
  imageUrl,
  recruitNum,
  applicants,
}: Props) {
  const totalApplicants = applicants.length;
  const approvedApplicants = applicants.filter(
    (a) => a.status === 'APPROVED',
  ).length;
  const rejectedApplicants = applicants.filter(
    (a) => a.status === 'REJECTED',
  ).length;
  const pendingApplicants = applicants.filter(
    (a) => a.status === 'PENDING',
  ).length;

  return (
    <>
      <div className="mt-1 flex flex-col bg-white p-6">
        <ActivityInfo
          title={title}
          category={category}
          endDate={endDate}
          imageUrl={imageUrl}
        />
        <div className="bg-Box-Line border-Box-Line mt-4 border-[0.5px]"></div>
        <div className="flex flex-col items-end pt-1.5">
          <Txt className="text-Logo-Mint">
            총 지원자: {totalApplicants}명 / 모집인원: {recruitNum}명
          </Txt>
          <div className="flex gap-2">
            <Txt size="sm" className="text-gray-500">
              (수락: {approvedApplicants}명
            </Txt>
            <Txt size="sm" className="text-gray-500">
              거절: {rejectedApplicants}명
            </Txt>
            <Txt size="sm" className="text-gray-500">
              대기: {pendingApplicants}명)
            </Txt>
          </div>
        </div>
      </div>
    </>
  );
}
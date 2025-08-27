export default async function VolunteerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <main className='p-4'>
      <h1>봉사 상세 페이지</h1>
      <p>봉사 ID: {id}</p>
    </main>
  );
}

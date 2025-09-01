import TopBar from '@/components/atoms/TopBar';
import WishList from '@/components/wish/WishList';

export default function WishPage() {
  return (
    <main className='bg-page-gradient flex flex-col'>
      <TopBar title='찜한 봉사 ' bgColor='bg-page-background' />
      <WishList />
    </main>
  );
}

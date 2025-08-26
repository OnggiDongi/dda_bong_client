import TopBar from './components/TopBar';

import Title from './components/Title';
import Category from './components/Category';
import Detail from './components/Detail';

export default function ApplyPage() {
  return (
    <div className='flex w-full flex-col'>
      <div>
        <TopBar />
      </div>
      <div>
        <Title />
      </div>
      <div>
        <Category />
      </div>
      <div>
        <Detail />
      </div>
    </div>
  );
}

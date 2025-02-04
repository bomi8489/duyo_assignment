import Ribbon from '@/components/Ribbon/Ribbon';
import Slide from '@/components/Slide/Slide';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div className='h-full'>
      <div className='relative flex flex-col gap-4 p-4 z-50 bg-[#f2f3f5]'>
        <Title />
        <Ribbon />
      </div>
      <Slide />
    </div>
  );
}

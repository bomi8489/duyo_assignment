import Ribbon from '@/components/Ribbon/Ribbon';
import Slide from '@/components/Slide/Slide';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <Title />
      <Ribbon />
      <Slide />
    </div>
  );
}

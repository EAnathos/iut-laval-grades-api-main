import { StudentsList } from './students-list';

export default function Home() {
  return (
    <div className='min-h-svh bg-muted '>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StudentsList />
      </div>
    </div>
  );
}

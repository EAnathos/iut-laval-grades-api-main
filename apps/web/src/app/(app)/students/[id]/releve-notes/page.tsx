// "use client";
// import api from '@web/lib/api';
// import { getUser } from '@web/lib/auth';
// import { notFound } from 'next/navigation';
// import { releverNotesAction } from '@web/actions/grades/grades.actions';

// type StudentProps = {
//   params: {
//     id?: number;
//   };
// };

// export default async function gradesPdf({ params }: StudentProps) {
//     let res;
//     if (params.id !== undefined) {
//         console.log (releverNotesAction(params.id));
//         res = await releverNotesAction(params.id);

//     } else {
//         console.error('Student ID is undefined');
//     }

//   return (
//     <div className="min-h-svh bg-muted">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       </div>
//     </div>
//   );
// }

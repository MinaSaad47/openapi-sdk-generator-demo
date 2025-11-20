import { useQuery } from "@tanstack/react-query";
import type { UserStudent, UserTeacher } from "./client";
import { getUsersOptions } from "./client/@tanstack/react-query.gen";

function UsersListViaQueryOptions() {
  const users = useQuery({
    ...getUsersOptions(),
    refetchInterval: 3 * 1000,
  });

  if (users.isPending) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <div className='animate-spin h-10 w-10 border-b-4 border-blue-500 rounded-full'></div>
      </div>
    );
  }

  if (users.isError) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <div className='text-red-500 text-lg'>Error loading users</div>
      </div>
    );
  }

  return (
    <div className='bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
            Our Users
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {users.data.map((user) =>
            user.type === "student" ? ( // user will contain { type: "student", id: "...", name: "...", email: "...", gpa: "...", major: "..." }
              <StudentItem key={user.id} student={user} />
            ) : user.type === "teacher" ? ( // user will contain { type: "teacher", id: "...", name: "...", email: "...", department: "...", yearsOfExperience: "..." }
              <TeacherItem key={user.id} teacher={user} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

type StudentItemProps = {
  student: UserStudent;
};

function StudentItem({ student }: StudentItemProps) {
  return (
    <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100'>
      <div className='h-48 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center'>
        <div className='text-4xl text-blue-500 opacity-20 group-hover:scale-110 transition-transform duration-300'>
          🧑🏻‍🎓
        </div>
      </div>

      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {student.name}
        </h2>

        <p className='text-gray-600 text-sm mb-2 line-clamp-3 leading-relaxed'>
          {student.email}
        </p>

        <div className='space-y-2 mb-4'>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold'>Major:</span> {student.major}
          </p>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold'>GPA:</span> {student.gpa}
          </p>
        </div>

        <div className='flex items-center justify-between mt-auto'>
          <span className='text-sm text-gray-500'>
            Student ID: {student.id.slice(0, 8)}...
          </span>
        </div>
      </div>
    </div>
  );
}

type TeacherItemProps = {
  teacher: UserTeacher;
};

function TeacherItem({ teacher }: TeacherItemProps) {
  return (
    <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100'>
      <div className='h-48 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center'>
        <div className='text-4xl text-blue-500 opacity-20 group-hover:scale-110 transition-transform duration-300'>
          🧑🏻‍🏫
        </div>
      </div>

      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {teacher.name}
        </h2>

        <p className='text-gray-600 text-sm mb-2 line-clamp-3 leading-relaxed'>
          {teacher.email}
        </p>

        <div className='space-y-2 mb-4'>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold'>Department:</span>{" "}
            {teacher.department}
          </p>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold'>Experience:</span>{" "}
            {teacher.yearsOfExperience} years
          </p>
        </div>

        <div className='flex items-center justify-between mt-auto'>
          <span className='text-sm text-gray-500'>
            Teacher ID: {teacher.id.slice(0, 8)}...
          </span>
        </div>
      </div>
    </div>
  );
}

export default UsersListViaQueryOptions;

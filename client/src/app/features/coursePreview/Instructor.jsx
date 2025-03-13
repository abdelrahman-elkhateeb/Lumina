function Instructor({ instructor }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {instructor.name[0]}
        </span>
      </div>
      <h4 className="text-md text-gray-800 dark:text-gray-200">
        Created by <span className="font-semibold">{instructor.name}</span>
      </h4>
    </div>
  )
}

export default Instructor;

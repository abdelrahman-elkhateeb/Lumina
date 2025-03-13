function Instructor({ instructor }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="w-10 h-10 rounded-full bg-site-accent capitalize flex items-center justify-center">
        <span className="text-lg font-semibold">
          {instructor.name[0]}
        </span>
      </div>
      <h4 className="text-md text-site-text font-light">
        Created by <span className="font-semibold capitalize">{instructor.name}</span>
      </h4>
    </div>
  )
}

export default Instructor;

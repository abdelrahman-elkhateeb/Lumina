function CourseOverview({ course }) {
  return (
    <section>

      <div className="p-6 mt-5 rounded-xl bg-primary-500">
        <h2 className="text-2xl font-bold mb-4">Course Description</h2>
        <p className="text-text leading-relaxed">
          {course.description}
        </p>
      </div>
    </section>
  )
}

export default CourseOverview;

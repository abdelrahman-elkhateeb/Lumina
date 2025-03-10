function CourseCard({ course }) {
  return (
    <div className="w-max shadow-lg rounded-lg overflow-hidden bg-site-background">
      <img src={course.courseImage} alt={course.title} className="w-full h-48 object-cover" />
      <h3 className="capitalize text-sm my-1">{course.title}</h3>
      <h4 className="capitalize text-xs">{course.instructor.name}</h4>
      <p className="capitalize">{course.enrollmentType}</p>
    </div>
  )
};

export default CourseCard;

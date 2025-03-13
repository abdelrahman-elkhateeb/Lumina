function Sections({ sections }) {
  if (!sections.length) return <p>No sections available.</p>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Course Content</h2>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section._id}>
            <h3 className="text-base font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.lessons.map((lesson) => (
                <li key={lesson._id.$oid} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500">
                  {lesson.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sections;

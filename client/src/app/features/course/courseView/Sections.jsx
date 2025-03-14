function Sections({ sections, setSelectedVideoUrl }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Course Content</h2>
      {sections.map((section, i) => (
        <div key={section._id}>
          <h3 className="text-lg font-bold mb-2">section {i + 1}: {section.title}</h3>
          <ul className="ml-4">
            {section.lessons.map(lesson => (
              <li key={lesson._id}>
                <button onClick={() => setSelectedVideoUrl(lesson.videoUrl)}>
                  <h4 className="font-semibold">lesson {i + 1}: {lesson.title}</h4>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Sections;

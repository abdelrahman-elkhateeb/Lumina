import { useState } from "react";

function Sections({ sections, setSelectedVideoUrl }) {
  const [activeSections, setActiveSections] = useState({});
  console.log(activeSections);

  const toggleSection = (sectionId) => {
    setActiveSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <nav aria-label="Course Content">
      <h2 className="text-lg font-bold mb-4">Course Content</h2>
      {sections.map((section, i) => {
        const isActive = activeSections[section._id];
        return (
          <section key={section._id} className="mb-4 border-b">
            <button
              onClick={() => toggleSection(section._id)}
              aria-expanded={isActive}
              className="w-full text-left flex justify-between items-center py-2 cursor-pointer"
            >
              <h3 className="text-lg font-bold">
                Section {i + 1}: {section.title}
              </h3>
              <span>{isActive ? "−" : "+"}</span>
            </button>

            {isActive && (
              <ul className="ml-4 mt-2 space-y-2">
                {section.lessons.map((lesson, j) => (
                  <li key={lesson._id}>
                    <button
                      onClick={() => setSelectedVideoUrl(lesson.videoUrl)}
                      className="text-sm font-medium text-left hover:underline w-full"
                    >
                      Lesson {j + 1}: {lesson.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </nav>
  );
}

export default Sections;

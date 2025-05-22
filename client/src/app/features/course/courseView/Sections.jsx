import { useState } from "react";
import { useFetchUserDataQuery } from "../../redux/auth/registrationApi";
import LightBulbLoader from "../../ui/LightBulbLoader";
import { useDeleteSectionMutation } from "../../redux/courses/coursesApi";
import { Trash2 } from "lucide-react";

function Sections({ sections, setSelectedVideoUrl, courseId }) {

  const [activeSections, setActiveSections] = useState({});
  const { data, isLoading, error } = useFetchUserDataQuery();
  const [deleteSection] = useDeleteSectionMutation();


  const toggleSection = (sectionId) => {
    setActiveSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (isLoading) return <LightBulbLoader />
  const userType = data.data?.user?.userType ==="admin";

  return (
    <nav aria-label="Course Content">
      <h2 className="text-lg capitalize font-bold mb-4">Course Content:</h2>
      {sections.map((section, i) => {
        const isActive = activeSections[section._id];
        return (
          <section key={section._id} className="mb-4 border-b p-4">
            <button
              onClick={() => toggleSection(section._id)}
              aria-expanded={isActive}
              className="w-full text-left flex justify-between items-center py-2 cursor-pointer"
            >
              <h3 className="text-lg font-bold">
                Section {i + 1}: {section.title}
              </h3>
              <span>{isActive ? "−" : "+"}</span>
              {userType && (<button
                onClick={() => deleteSection({ courseId, sectionId: section._id })}
                className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>)}
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

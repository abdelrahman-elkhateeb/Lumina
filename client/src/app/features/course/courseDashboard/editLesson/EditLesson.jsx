import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { Link } from "react-router-dom";

function EditLesson() {
  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />
      <Link
        to="/section/manage/edit"
        className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
      >
        <span className="material-symbols-outlined">
          arrow_back
        </span>
        Update course
      </Link>
      <form action="">
        
      </form>
    </section>
  )
}

export default EditLesson

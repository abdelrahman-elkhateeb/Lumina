import EditProfileForm from "./EditProfileForm";
import spaceMan from "../../../../public/assets/spaceMan(7).svg";
import { useFetchUserDataQuery } from "../redux/auth/registrationApi";
import Heading from "../ui/Heading";
import { useEffect, useState } from "react";
import maleSvg from "../../../../public/assets/male.svg";
import femaleSvg from "../../../../public/assets/female.svg";

function UserProfile() {
  const { data, isLoading } = useFetchUserDataQuery();
  const user = data?.data?.user;

  const [photoURL, setPhotoURL] = useState("");
  console.log(photoURL);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.photoURL) {
          setPhotoURL(parsedUser.photoURL);
          clearInterval(interval);
        }
      }
    }, 500);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background-500 px-4 py-10 text-text">
      <div className="max-w-4xl mx-auto bg-background-700 rounded-2xl p-8">
        <Heading img={spaceMan} title="Edit Profile" />

        <div className="flex items-center flex-wrap gap-6 mt-10">

          {photoURL ? <img src={photoURL} className="w-28 h-28 rounded-full border-4 border-accent-500 object-cover shadow-lg" alt="" />
            :
            <img
              src={user.gender === "male" ? maleSvg : femaleSvg}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-accent-500 object-cover shadow-lg"
            />}
          <div>
            <h4 className="text-2xl font-semibold capitalize text-accent-700">
              Hello, {user?.name}
            </h4>
            <p className="text-sm text-accent-500 mt-1">{user.email}</p>
          </div>
        </div>

        <div>
          <EditProfileForm user={user} />
        </div>
      </div>
    </section>
  );
}

export default UserProfile;

import EditProfileForm from "./EditProfileForm";
import spaceMan from "../../../../public/assets/spaceMan(7).svg";
import { useFetchUserDataQuery } from "../redux/auth/registrationApi";

function UserProfile() {
  const { data, isLoading } = useFetchUserDataQuery();

  const user = data?.data?.user;

  return (
    <section className="h-dvh container m-auto px-4">
      <div className="flex items-center">
        <div className="w-24">
          <img src={spaceMan} alt="" />
        </div>

        <h1 className="text-text my-4 capitalize md:text-2xl mt-5">profile & settings</h1>
      </div>
      <EditProfileForm user={user} />
    </section>
  )
}

export default UserProfile;

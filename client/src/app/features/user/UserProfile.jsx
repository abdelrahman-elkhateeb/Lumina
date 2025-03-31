import EditProfileForm from "./EditProfileForm";
import spaceMan from "../../../../public/assets/spaceMan(7).svg";
import { useFetchUserDataQuery } from "../redux/auth/registrationApi";
import Heading from "../ui/Heading";

function UserProfile() {
  const { data, isLoading } = useFetchUserDataQuery();

  const user = data?.data?.user;

  return (
    <section className="h-dvh container m-auto px-4">
      <Heading img={spaceMan} title={"edit profile"} />
      <h4 className="capitalize mt-5">hello, {user?.name}</h4>
      <EditProfileForm user={user} />
    </section>
  )
}

export default UserProfile;

import EditProfileForm from "./EditProfileForm";

function UserProfile() {
  return (
    <section className="h-dvh container m-auto px-4">
      <h1 className="text-text my-4 capitalize md:text-2xl">profile & settings</h1>
      <EditProfileForm />
    </section>
  )
}

export default UserProfile;

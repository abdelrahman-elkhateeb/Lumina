import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useUpdateUserMutation } from "../redux/user/userApi"; // Adjust the path as needed

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field").min(2, "Name is too short 😒"),
  email: yup.string().email("Email is invalid").required("Email is a required field"),
});

function EditProfileForm({ user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Pre-fill form with existing user data
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUser(data).unwrap();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 p-6 shadow-md rounded-lg"
      >
        <div>
          <label htmlFor="name" className="block text-sm">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="text-primary-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-accent-500 w-full"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="text-primary-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-site-accent w-full"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {isError && <p className="text-red-500 text-sm">Update failed. {error?.data?.message}</p>}
        {isSuccess && <p className="text-green-500 text-sm">Profile updated successfully!</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;

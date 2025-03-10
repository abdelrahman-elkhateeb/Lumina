import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("name is required field").min(2, "name is too short 😒"),
  email: yup.string().email("email is invalid form").required("email is required field"),
})

function EditProfileForm() {
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

  // useEffect(() => {
  //   if (user) {
  //     reset({
  //       name: user.name,
  //       email: user.email,
  //     });
  //   }
  // })

  const onSubmit = (data) => {

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 shadow-md rounded-lg">
      <div>
        <label htmlFor="name" className="block text-sm">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-site-primary"
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
          className="mt-1 block w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-site-primary"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-site-primary text-white py-2 rounded-lg hover:bg-site-secondary transition"
      >
        Update Profile
      </button>
    </form>
  )
}

export default EditProfileForm

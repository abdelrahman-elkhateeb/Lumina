import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/users",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: "updateUser",
          method: "PATCH",
          body: data,
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      },
    })
  })
})

export const { useUpdateUserMutation } = userSlice;
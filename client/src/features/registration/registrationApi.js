import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationSlice = createApi({
  reducerPath: 'registration',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users',
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data
      })
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data
      })
    }),
    fetchUserData: builder.query({
      query: (userId) => `/${userId}`, // Adjust endpoint as needed
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  })
})

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useFetchUserDataQuery,
  useLogoutUserMutation,
} = registrationSlice;
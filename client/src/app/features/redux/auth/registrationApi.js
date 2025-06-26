import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationSlice = createApi({
  reducerPath: 'registration',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/users',
    baseUrl: 'https://lumina-php0zcgi0-abdelrahman-elkhateebs-projects.vercel.app/api/users',
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    signupUser: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    fetchUserData: builder.query({
      query: () => '/user',
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/googleLogin",
        method: "POST",
        body: credentials
      })
    })
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useFetchUserDataQuery,
  useLogoutUserMutation,
  useGoogleLoginMutation
} = registrationSlice;
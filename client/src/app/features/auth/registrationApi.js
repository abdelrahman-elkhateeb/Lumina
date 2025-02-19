import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationSlice = createApi({
  reducerPath: 'registration',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users',
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
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useFetchUserDataQuery,
  useLogoutUserMutation,
} = registrationSlice;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationSlice = createApi({
  reducerPath: 'registration',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
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
  })
})

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useFetchUserDataQuery,
} = registrationSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseSlice = createApi({
  reducerPath: "course",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: () => `/courses`,
    }),
  })
});

export const { useGetCourseQuery } = courseSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseSlice = createApi({
  reducerPath: "course",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => `/courses`,
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
    }),
  })
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseSlice = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCoursePreview: builder.query({
      query: (id) => `/courses/${id}/preview`,
    }),
    getcoursesPreview: builder.query({
      query: () => `/courses/preview`,
    })
  }),
});

export const {
  useGetCoursePreviewQuery,
  useGetcoursesPreviewQuery
} = courseSlice;

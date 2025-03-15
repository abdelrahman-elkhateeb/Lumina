import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseSlice = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getcoursesPreview: builder.query({
      query: () => `/courses/preview`,
    }),
    getCoursePreview: builder.query({
      query: (id) => `/courses/${id}/preview`,
    }),
  }),
});

export const {
  useGetCoursePreviewQuery,
  useGetcoursesPreviewQuery
} = courseSlice;

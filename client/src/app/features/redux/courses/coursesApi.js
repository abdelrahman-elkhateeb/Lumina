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
      query: (id) => `/courses/preview/${id}`,
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
    }),
    getMyCourses: builder.query({
      query: () => `/courses/mycourses`,
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/courses/create",
        method: "POST",
        body: courseData
      }),
    }),
    instructorCourses: builder.query({
      query: () => `/courses/manage`,
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['course'],
    })
  }),
});

export const {
  useGetCoursePreviewQuery,
  useGetcoursesPreviewQuery,
  useGetCourseQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useInstructorCoursesQuery,
  useDeleteCourseMutation
} = courseSlice;

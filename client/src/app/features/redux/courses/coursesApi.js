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
    }),
    createSection: builder.mutation({
      query: (sectionData) => ({
        url: "/courses/section/create",
        method: "POST",
        body: sectionData
      }),
    }),
    createLesson: builder.mutation({
      query: (lessonData) => ({
        url: "/courses/lesson/create",
        method: "POST",
        body: lessonData
      }),
    }),
    updateCourse: builder.mutation({
      query: (courseData) => ({
        url: `/courses/${courseData.courseId}`,
        method: "PATCH",
        body: courseData.data
      })
    }),
    updateSection: builder.mutation({
      query: (sectionData) => ({
        url: `/courses/${sectionData.courseId}/sections/${sectionData.sectionId}`,
        method: "PATCH",
        body: sectionData.data
      })
    }),
    updateLesson: builder.mutation({
      query: (lessonData) => ({
        url: `/courses/${lessonData.courseId}/lessons/${lessonData.lessonId}`,
        method: "PATCH",
        body: lessonData.data
      })
    }),
  }),
});

export const {
  useGetCoursePreviewQuery,
  useGetcoursesPreviewQuery,
  useGetCourseQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useInstructorCoursesQuery,
  useDeleteCourseMutation,
  useCreateSectionMutation,
  useCreateLessonMutation,
  useUpdateCourseMutation,
  useUpdateSectionMutation,
  useUpdateLessonMutation
} = courseSlice;

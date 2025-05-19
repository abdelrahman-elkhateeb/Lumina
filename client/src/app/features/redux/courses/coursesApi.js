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
      query: (courseId) => `/courses/preview/${courseId}`,
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
    }),
    getCourses: builder.query({
      query: () => `/courses`
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
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}`,
        method: "PATCH",
        body: data
      })
    }),
    updateSection: builder.mutation({
      query: ({ courseId, sectionId, data }) => ({
        url: `/courses/${courseId}/sections/${sectionId}`,
        method: "PATCH",
        body: data
      })
    }),
    deleteSection: builder.mutation({
      query: ({ sectionId, courseId }) => ({
        url: `/courses/${courseId}/sections/${sectionId}`,
        method: 'DELETE',
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ courseId, lessonId, data }) => ({
        url: `/courses/${courseId}/lessons/${lessonId}`,
        method: "PATCH",
        body: data
      })
    }),
    createPlacementTest: builder.mutation({
      query: ({ question, correctOption, options, courseId }) => ({
        url: "/courses/create-placementTest",
        method: "PATCH",
        body: { question, correctOption, options, courseId },
      }),
    }),
    getPlacementTest: builder.query({
      query: (courseId) => ({
        url: `/courses/get-placementTest/${courseId}`,
        method: "GET",
      })
    }),
    purchaseCourses: builder.mutation({
      query: (courseIds) => ({
        url: "/courses/purchase-course",
        method: "POST",
        body: { courseIds }
      })
    })
  }),
});

export const {
  useGetCoursePreviewQuery,
  useGetcoursesPreviewQuery,
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useInstructorCoursesQuery,
  useDeleteCourseMutation,
  useCreateSectionMutation,
  useCreateLessonMutation,
  useUpdateCourseMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useUpdateLessonMutation,
  useCreatePlacementTestMutation,
  useGetPlacementTestQuery,
  usePurchaseCoursesMutation
} = courseSlice;

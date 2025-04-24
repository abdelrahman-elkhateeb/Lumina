import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/payment",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    processPayment: builder.mutation({
      query: (paymentData) => (
        {
          url: "/create-checkout-session",
          method: "POST",
          body: paymentData
        }
      )
    })
  }
  )
});

export const { useProcessPaymentMutation } = paymentApi;
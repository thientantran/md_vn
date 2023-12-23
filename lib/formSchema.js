import * as z from 'zod';
export const createTitleSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  })
})
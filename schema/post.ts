import {z} from 'zod'
export const postSchema = z.object({
    caption : z.string().min(1,"caption can't be empty")
})


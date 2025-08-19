import { z } from "zod";

export const profileSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  dob: z.string().nonempty("Date of Birth is required"),
});

export type ProfileFormType = z.infer<typeof profileSchema>;

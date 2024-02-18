import z from 'zod';

export const SingUserRequestSchema = z.object({ id: z.string().uuid() });

export const UserFiltersSchema = z.object({ id: z.string().uuid() });

export const UserResponseSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30),
    email: z.string().email().min(1)
});

export const UsersResponseSchema = z.array(UserResponseSchema).min(1)

export type User = z.infer<typeof UserResponseSchema>;
export type Users = z.infer<typeof UsersResponseSchema>;
import { z } from 'zod';

// ==========================================
// 1. Firebase Data / Domain Models
// ==========================================
export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email().nullable(),
    displayName: z.string().nullable(),
    photoURL: z.string().url().nullable(),
});
export type UserModel = z.infer<typeof UserSchema>;

export const ServiceSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Service name is required'),
    description: z.string(),
    icon: z.string(),
    price: z.string(),
    category: z.string(),
    imageUrl: z.string().url().optional(),
    rating: z.number().min(0).max(5).optional(),
    isAvailable: z.boolean().optional().default(true),
});
export type ServiceModel = z.infer<typeof ServiceSchema>;

export const BookingSchema = z.object({
    bookingId: z.string(),
    serviceId: z.string(),
    serviceName: z.string(),
    status: z.enum(['confirmed', 'pending', 'failed', 'cancelled']),
    message: z.string(),
    createdAt: z.string().optional(),
});
export type BookingModel = z.infer<typeof BookingSchema>;

export const NotificationSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    data: z.record(z.string(), z.any()).optional(),
    timestamp: z.number(),
    read: z.boolean().default(false),
    type: z.enum(['info', 'warning', 'error', 'success']).optional(),
});
export type NotificationModel = z.infer<typeof NotificationSchema>;

// ==========================================
// 2. Forms Validations
// ==========================================
export const LoginFormSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginFormData = z.infer<typeof LoginFormSchema>;

export const SignUpFormSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const ChangePasswordFormSchema = z.object({
    currentPassword: z.string().min(6, 'Current password must be at least 6 characters'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password don't match",
    path: ["confirmPassword"],
});
export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;

export const ServiceFilterFormSchema = z.object({
    category: z.string().optional(),
    searchQuery: z.string().optional(),
});
export type ServiceFilterFormData = z.infer<typeof ServiceFilterFormSchema>;

// ==========================================
// 3. API Responses & Requests
// ==========================================
export const ServicesApiResponseSchema = z.object({
    services: z.array(ServiceSchema),
    total: z.number().nonnegative(),
});
export type ServicesApiResponsePayload = z.infer<typeof ServicesApiResponseSchema>;

export const BookingRequestSchema = z.object({
    serviceId: z.string(),
    serviceName: z.string(),
});
export type BookingRequestPayload = z.infer<typeof BookingRequestSchema>;

export const BookingResponseSchema = z.object({
    bookingId: z.string(),
    serviceId: z.string(),
    serviceName: z.string(),
    status: z.enum(['confirmed', 'pending', 'failed']),
    message: z.string(),
});
export type BookingResponsePayload = z.infer<typeof BookingResponseSchema>;

// ==========================================
// 4. Redux / Zustand States
// ==========================================
export const AuthStateSchema = z.object({
    user: UserSchema.nullable(),
    isLoading: z.boolean(),
    error: z.string().nullable(),
});
export type AuthStateData = z.infer<typeof AuthStateSchema>;

export const NotificationStateSchema = z.object({
    notifications: z.array(NotificationSchema),
    unreadCount: z.number().nonnegative(),
    isLoading: z.boolean(),
    error: z.string().nullable(),
});
export type NotificationStateData = z.infer<typeof NotificationStateSchema>;

export const SettingsStateSchema = z.object({
    isLoading: z.boolean(),
    error: z.string().nullable(),
    theme: z.enum(['light', 'dark', 'system']),
});
export type SettingsStateData = z.infer<typeof SettingsStateSchema>;

// ==========================================
// 5. Dashboard Data Definitions
// ==========================================
export const DashboardStatsSchema = z.object({
    totalBookings: z.number().nonnegative(),
    activeServices: z.number().nonnegative(),
    unreadNotifications: z.number().nonnegative(),
    revenue: z.number().nonnegative().optional(),
});
export type DashboardStatsModel = z.infer<typeof DashboardStatsSchema>;

// ==========================================
// 6. Navigation Params
// ==========================================
// We define them here to keep shapes strict, though React Navigation types them natively.
export const ServiceDetailNavParamsSchema = z.object({
    serviceId: z.string(),
    title: z.string(),
});

export const BookingConfirmationNavParamsSchema = z.object({
    bookingId: z.string(),
    serviceName: z.string(),
    status: z.string(),
    message: z.string(),
});

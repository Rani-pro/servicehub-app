export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    price: string;
    category: string;
    imageUrl?: string;
    rating?: number;
    isAvailable?: boolean;
}

export interface ServicesApiResponse {
    services: Service[];
    total: number;
}

export interface BookingRequest {
    serviceId: string;
    serviceName: string;
}

export interface BookingResponse {
    bookingId: string;
    serviceId: string;
    serviceName: string;
    status: 'confirmed' | 'pending';
    message: string;
}

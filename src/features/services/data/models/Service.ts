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

import { BaseRepository } from '../../../core/baseRepository';
import { Service, ServicesApiResponse, BookingRequest, BookingResponse } from './models/Service';

export class ServicesRepository extends BaseRepository {
    private static instance: ServicesRepository;

    // Mock data for fallback/testing
    private mockServices: Service[] = [
        {
            id: '1',
            name: 'Mobile Repair',
            description: 'Professional mobile phone repair services. Screen replacement, battery change, and more.',
            icon: 'cellphone-wireless',
            price: '₹500 - ₹5000',
            category: 'Electronics',
            rating: 4.5,
            isAvailable: true,
        },
        {
            id: '2',
            name: 'AC Repair',
            description: 'Expert AC repair and maintenance services. Gas refilling, cleaning, and installation.',
            icon: 'air-conditioner',
            price: '₹800 - ₹3000',
            category: 'Home Appliances',
            rating: 4.7,
            isAvailable: true,
        },
        {
            id: '3',
            name: 'Laptop Repair',
            description: 'Complete laptop repair solutions. Hardware upgrades, software fixes, and data recovery.',
            icon: 'laptop',
            price: '₹1000 - ₹8000',
            category: 'Electronics',
            rating: 4.6,
            isAvailable: true,
        },
        {
            id: '4',
            name: 'Washing Machine Repair',
            description: 'Washing machine repair and servicing. All brands supported with genuine parts.',
            icon: 'washing-machine',
            price: '₹600 - ₹2500',
            category: 'Home Appliances',
            rating: 4.4,
            isAvailable: true,
        },
        {
            id: '5',
            name: 'Refrigerator Repair',
            description: 'Fridge repair services for all cooling issues. Gas charging and compressor replacement.',
            icon: 'fridge',
            price: '₹700 - ₹4000',
            category: 'Home Appliances',
            rating: 4.5,
            isAvailable: true,
        },
        {
            id: '6',
            name: 'TV Repair',
            description: 'LED, LCD, and Smart TV repair services. Screen and panel replacement available.',
            icon: 'television',
            price: '₹800 - ₹6000',
            category: 'Electronics',
            rating: 4.3,
            isAvailable: false,
        },
    ];

    private constructor() {
        super();
    }

    public static getInstance(): ServicesRepository {
        if (!ServicesRepository.instance) {
            ServicesRepository.instance = new ServicesRepository();
        }
        return ServicesRepository.instance;
    }

    /**
     * Fetch all services from the backend API
     * Endpoint: GET /services
     */
    public async getServices(): Promise<Service[]> {
        try {
            // Real API call - uncomment when backend is ready
            // const response = await this.get<ServicesApiResponse>('/services');
            // return response.services;

            // Mock API call with delay to simulate network
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.mockServices);
                }, 800);
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Fetch services by category
     * Endpoint: GET /services?category={category}
     */
    public async getServicesByCategory(category: string): Promise<Service[]> {
        try {
            // Real API call - uncomment when backend is ready
            // const response = await this.get<ServicesApiResponse>(`/services?category=${category}`);
            // return response.services;

            // Mock implementation
            return new Promise((resolve) => {
                setTimeout(() => {
                    const filtered = this.mockServices.filter(s => s.category === category);
                    resolve(filtered);
                }, 500);
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Fetch a single service by ID
     * Endpoint: GET /services/{id}
     */
    public async getServiceById(id: string): Promise<Service | undefined> {
        try {
            // Real API call - uncomment when backend is ready
            // return await this.get<Service>(`/services/${id}`);

            // Mock implementation
            return this.mockServices.find(s => s.id === id);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Search services by name or description
     * Endpoint: GET /services/search?q={query}
     */
    public async searchServices(query: string): Promise<Service[]> {
        try {
            // Real API call - uncomment when backend is ready
            // const response = await this.get<ServicesApiResponse>(`/services/search?q=${query}`);
            // return response.services;

            // Mock implementation
            return new Promise((resolve) => {
                setTimeout(() => {
                    const lowerQuery = query.toLowerCase();
                    const filtered = this.mockServices.filter(s => 
                        s.name.toLowerCase().includes(lowerQuery) ||
                        s.description.toLowerCase().includes(lowerQuery)
                    );
                    resolve(filtered);
                }, 400);
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Book a service
     * Endpoint: POST /bookings
     * On success the backend triggers an FCM push to the device.
     */
    public async bookService(payload: BookingRequest): Promise<BookingResponse> {
        try {
            // Real API call - uncomment when backend is ready
            // return await this.post<BookingResponse>('/bookings', payload);

            // Mock: simulate network delay then return a confirmed booking
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        bookingId: `BK-${Date.now()}`,
                        serviceId: payload.serviceId,
                        serviceName: payload.serviceName,
                        status: 'confirmed',
                        message: `Your ${payload.serviceName} has been booked successfully!`,
                    });
                }, 1000);
            });
        } catch (error) {
            return this.handleError(error);
        }
    }
}

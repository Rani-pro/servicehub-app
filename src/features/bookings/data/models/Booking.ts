export interface BookingRequest {
  serviceId: string;
  serviceName: string;
}

export interface BookingResponse {
  bookingId: string;
  serviceId: string;
  serviceName: string;
  status: 'confirmed' | 'pending' | 'failed';
  message: string;
  createdAt: string;
}

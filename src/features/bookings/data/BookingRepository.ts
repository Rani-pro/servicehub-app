import { BaseRepository } from '../../../core/baseRepository';
import { BookingRequest, BookingResponse } from './models/Booking';

/**
 * BookingRepository
 *
 * Handles booking API calls.
 */
export class BookingRepository extends BaseRepository {
  private static instance: BookingRepository;

  static getInstance(): BookingRepository {
    if (!BookingRepository.instance) {
      BookingRepository.instance = new BookingRepository();
    }
    return BookingRepository.instance;
  }

  /**
   * Create a new booking.
   */
  async createBooking(payload: BookingRequest): Promise<BookingResponse> {
    return this.post<BookingResponse>('/bookings', payload);
  }
}

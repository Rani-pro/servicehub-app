import { BaseRepository } from '../../../core/baseRepository';
import { BookingRequestPayload, BookingResponsePayload } from '../../../shared/schema';

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
  async createBooking(payload: BookingRequestPayload): Promise<BookingResponsePayload> {
    return this.post<BookingResponsePayload>('/bookings', payload);
  }
}

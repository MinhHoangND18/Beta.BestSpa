// types/booking.ts
import { ItemType } from './invoice-item';

export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    NO_SHOW = 'no_show'
}

export interface Customer {
    id: number;
    fullName: string; 
    phone: string;
    email: string | null;
}

export interface Store {
    id: number;
    name: string;
    address: string;
}


export interface Booking {
    id: number;
    customerId: number;
    customer?: Customer;
    storeId: number;
    store?: Store;
    bookingDate: string; 
    startTime: string;   
    endTime: string | null; 
    status: BookingStatus;
    source: string | null;
    notes: string | null;
    confirm: boolean;
    createdBy: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface BookingResponse {
    data: Booking[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface CreateBookingPayload {
    customerId: number;
    storeId: number;
    bookingDate: string;
    startTime: string;
    endTime?: string;
    status?: BookingStatus;
    source?: string;
    notes?: string;
    confirm?: boolean;
}

export type UpdateBookingPayload = Partial<CreateBookingPayload>;

export interface BookingFilters {
    page?: number;
    limit?: number;
    customerId?: number;
    storeId?: number;
    bookingDate?: string;
    status?: BookingStatus;
}

// --- New DTOs for Creating a Booking Order ---

export interface CustomerForBookingDto {
    fullName: string;
    phone: string;
    email?: string;
  }
  
export interface InvoiceItemForBookingDto {
    itemId: number;
    itemType: ItemType;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxAmount: number;
    totalPrice: number;
    itemName: string;
    staffId?: number;
}

export interface CreateBookingOrderDto {
    customer: CustomerForBookingDto;
    booking: {
      storeId: number;
      bookingDate: string;
      startTime: string;
      notes?: string;
    };
    invoice: {
      storeId: number;
      subtotal: number;
      discountAmount: number;
      taxAmount: number;
      totalAmount: number;
      notes?: string;
      items: InvoiceItemForBookingDto[];
    };
}
  
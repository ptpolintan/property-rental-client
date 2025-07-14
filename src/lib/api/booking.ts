import { Booking } from "../models/bookings";

export async function createBooking(booking: Booking) {
    const res = await fetch('http://localhost:5128/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
    });

    if (!res.ok) {
        throw new Error('Failed to create booking');
    }

    return await res.json();
}
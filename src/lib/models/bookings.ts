export type Booking = {
    id: number;
    roomId: number;
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    infants: number;
    fullName: string;
    email: string;
    status: number;
};
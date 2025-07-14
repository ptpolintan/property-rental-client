'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '@/component/carousel/carousel';
import { Room } from '@/lib/models/rooms';
import { fetchRoomById } from '@/lib/api/rooms';
import { Baby, User2, Users2 } from 'lucide-react';
import Modal from '@/component/modal/modal';
import { Booking } from '@/lib/models/bookings';
import { createBooking } from '@/lib/api/booking';

interface BookingPageProps {
    params: {
        brandId: string;
        roomId: string;
    };
}

export default function BookingPage({ params }: BookingPageProps) {
    const router = useRouter();
    const [room, setRoom] = useState<Room | null>(null);
    const [error, setError] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [numberOfNights, setNumberOfNights] = useState(0);
    const { brandId, roomId } = params;

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');

    useEffect(() => {
        var b = JSON.parse(localStorage.getItem('bookingDetails')!) as Booking;
        setNumberOfNights(Math.ceil((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / (1000 * 60 * 60 * 24)));
    }, []);


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!fullName || !email) {
            setError('Full name and email are required.');
            return;
        }

        // Clear any previous errors
        setError('');

        // Show confirmation modal only if valid
        setIsOpen(true);
    };

    const handleConfirm = async () => {
        var b = JSON.parse(localStorage.getItem('bookingDetails')!) as Booking;
        b.roomId = Number(roomId);
        b.fullName = fullName;
        b.email = email;
        setIsLoading(true);
        await createBooking(b)
            .then();
        setResponse('Booking Confirmed!');
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRoomById(Number(roomId))
            .then(setRoom)
    }, [roomId]);

    if (!room) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 text-[var(--brand-label-color)]">
            <div className='border rounded-lg p-6 shadow-xl bg-[var(--brand-secondary-color)]'>
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <Carousel images={room.images} />

                <p className="text-lg mt-4">{room.description}</p>

                <div className="flex gap-6 text-sm text-gray-600 items-center my-2">
                    <div className="flex items-center gap-2">
                        <User2 size={16} className='text-[var(--brand-label-color)]' /> {room.maxAdults} Adults
                    </div>
                    <div className="flex items-center gap-2">
                        <Users2 size={16} className='text-[var(--brand-label-color)]' /> {room.maxChildren} Children
                    </div>
                    <div className="flex items-center gap-2">
                        <Baby size={16} className='text-[var(--brand-label-color)]' /> {room.maxInfants} Infants
                    </div>
                </div>

                <p className="font-semibold text-xl mt-6">${room.price} / night</p>

                <hr className="my-6" />

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Price per night:</span>
                        <span>${room.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Number of nights:</span>
                        <span>{numberOfNights}</span> {/* <-- You'd compute this from your check-in / check-out */}
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${(room.price * numberOfNights).toFixed(2)}</span>
                    </div>
                </div>

            </div>

            {/* Booking Form */}
            {error && <p className="text-red-500">{error}</p>}
            <form className="form-group space-y-4" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="form-control w-full p-2 border rounded mt-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control w-full p-2 border rounded mt-2"
                />
                <textarea
                    rows={5}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Special Requests (optional)"
                    className="form-control w-full p-2 border rounded mt-2"
                ></textarea>

                <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[var(--brand-button-color)] text-[var(--brand-buttonText-color)] font-semibold mt-2"
                >
                    Confirm Booking
                </button>
            </form>

            <Modal
                isOpen={isOpen}
                title="Confirm Booking"
                message={response || 'Are you sure you want to confirm this booking?'}
                isLoading={isLoading}
                onConfirm={!response ? handleConfirm : undefined}
                onClose={() => {
                    setIsOpen(false);

                    if (response) {
                        router.push(`/${brandId}`);
                    }

                    setResponse('');
                }}
            />
        </div>
    );
}
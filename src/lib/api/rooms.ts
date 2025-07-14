export async function fetchRoomsByBrand(brandId: number, checkIn: string, checkOut: string, adults: number, children: number, infants: number) {
    const res = await fetch(`http://localhost:5128/api/rooms/brand/${brandId}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&infants=${infants}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch rooms for brand ${brandId}`);
    }

    return res.json();
}

export async function fetchRoomById(roomId: number) {
    const res = await fetch(`http://localhost:5128/api/rooms/${roomId}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch rooms for brand ${roomId}`);
    }

    return res.json();
}
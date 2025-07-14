'use client';

import style from './page.module.css';
import React, { use, useEffect, useState } from "react";
import Carousel from "@/component/carousel/carousel";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import { fetchRoomsByBrand } from "@/lib/api/rooms";
import { fetchBrandDetails } from "@/lib/api/brands";
import { Room } from "@/lib/models/rooms";
import { Users2, Baby, User2 } from 'lucide-react';

export default function HomePage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = use(params);
  const { brand } = useTheme();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });

  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  useEffect(() => {
    localStorage.removeItem('bookingDetails');
  }, []);

  useEffect(() => {
    fetchBrandDetails(Number(brandId))
      .then(setRooms)
      .finally(() => setLoading(false));
  }, [brandId]);

  const handleSearch = () => {
    fetchRoomsByBrand(Number(brandId), checkIn, checkOut, adults, children, infants)
      .then(setRooms)
      .finally(() => setLoading(false));
  };

  const storeFilter = () => {
    localStorage.setItem('bookingDetails', JSON.stringify({brandId: Number(brandId), checkIn, checkOut, adults, children, infants}))
  }

  function getMinCheckoutDate(checkInDate: string) {
    if (!checkInDate) return ''; // just in case

    const date = new Date(checkInDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-10">
      <div className={`flex justify-center my-8 ${style.labelWrapper}`}>
        <form className="w-full max-w-md space-y-4 text-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:flex-1">
              <label className="mb-1 font-medium">Check-In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="flex flex-col w-full md:flex-1">
              <label className="mb-1 font-medium">Check-Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={getMinCheckoutDate(checkIn)}
                className="form-control"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-medium">Adults</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-medium">Children</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 font-medium">Infants</label>
              <input
                type="number"
                min="0"
                value={infants}
                onChange={(e) => setInfants(parseInt(e.target.value))}
                className="form-control"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="w-full text-[var(--brand-buttonText-color)] bg-[var(--brand-button-color)] py-2 shadow-xl rounded"
          >
            Search
          </button>
        </form>
      </div>

      {rooms.length > 0 && rooms.filter(x => x.brandId == brand.id).map((room) => (
        <section
          key={room.id}
          className="border rounded-lg p-6 shadow-xl max-w-4xl mx-auto space-y-4"
          style={{
            backgroundColor: 'var(--brand-secondary-color)',
            color: 'var(--brand-label-color)',
          }}
        >
          <h2 className="text-2xl font-semibold">{room.name}</h2>
          <Carousel images={room.images} />
          <p className="mt-4">{room.description}</p>

          <div className="flex gap-6 text-sm text-gray-600 items-center mt-2">
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

          <div className="flex justify-between items-center mt-4">
            <p className="mt-2 font-bold">${room.price} / night</p>

            <Link
              href={`/${brandId}/book/${room.id}`}
              className="inline-block px-5 py-2 font-semibold rounded hover:brightness-90 transition"
              onClick={storeFilter}
              style={{
                backgroundColor: 'var(--brand-button-color)',
                color: 'var(--brand-buttonText-color)',
              }}
            >
              Book Now
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
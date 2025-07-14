'use client';

import { notFound, redirect } from "next/navigation";

export default function Root() {
    redirect(notFound());
}
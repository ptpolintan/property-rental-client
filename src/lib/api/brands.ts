
export async function fetchBrandDetails(brandId: number) {    
    const res = await fetch(`http://localhost:5128/api/brands/${brandId}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch rooms for brand ${brandId}`);
    }

    return res.json();
}
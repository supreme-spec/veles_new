import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hotels } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { hotelSearchSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = hotelSearchSchema.safeParse({
    city: searchParams.get('city'),
    country: searchParams.get('country'),
    stars: searchParams.get('stars'),
    slug: searchParams.get('slug'),
    name: searchParams.get('name'),
    limit: searchParams.get('limit'),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid hotel search params', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { city, country, stars, slug, name, limit } = parsed.data;

  try {
    const conditions = [eq(hotels.status, 'ACTIVE')];

    if (city) {
      conditions.push(sql`${hotels.city} ILIKE ${`%${city}%`}`);
    }
    if (country) {
      conditions.push(sql`${hotels.country} ILIKE ${`%${country}%`}`);
    }
    if (stars) {
      conditions.push(eq(hotels.stars, Number(stars)));
    }
    if (slug) {
      conditions.push(eq(hotels.slug, slug));
    }
    if (name) {
      conditions.push(sql`${hotels.name} ILIKE ${`%${name}%`}`);
    }

    const results = await db
      .select({
        id: hotels.id,
        ostrovokHid: hotels.ostrovokHid,
        name: hotels.name,
        slug: hotels.slug,
        city: hotels.city,
        country: hotels.country,
        address: hotels.address,
        stars: hotels.stars,
        images: hotels.images,
        amenities: hotels.amenities,
        description: hotels.description,
        cancellationPolicies: hotels.cancellationPolicies,
        roomsData: hotels.roomsData,
        minPrice: hotels.minPrice,
        taxesIncluded: hotels.taxesIncluded,
        mealType: hotels.mealType,
        freeCancellationBefore: hotels.freeCancellationBefore,
      })
      .from(hotels)
      .where(and(...conditions))
      .limit(limit);

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error('[HOTELS SEARCH ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Search failed' }, { status: 500 });
  }
}

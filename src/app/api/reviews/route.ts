import { NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews, bookings } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { getCached, setCached } from '@/lib/redis';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hotelHid = Number(searchParams.get('hotelHid'));
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');

  if (!hotelHid) {
    return NextResponse.json({ error: 'hotelHid is required' }, { status: 400 });
  }

  const key = `reviews:${hotelHid}:${page}:${limit}`;

  try {
    const cached = await getCached<any>(key);
    if (cached) {
      return NextResponse.json(cached);
    }

    const approvedReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.hotelHid, hotelHid))
      .orderBy(desc(reviews.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const aggregateResult = await db
      .select({
        averageRating: sql<number>`ROUND(AVG(${reviews.rating})::numeric, 1)`,
        totalReviews: sql<number>`COUNT(*)`,
      })
      .from(reviews)
      .where(eq(reviews.hotelHid, hotelHid));

    const aggregate = aggregateResult[0] || { averageRating: 0, totalReviews: 0 };

    const payload = {
      reviews: approvedReviews,
      aggregate: {
        averageRating: Number(aggregate.averageRating),
        totalReviews: Number(aggregate.totalReviews),
      },
    };

    await setCached(key, payload, 300);

    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('[REVIEWS GET ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      hotelHid,
      authorName,
      rating,
      cleanlinessRating,
      locationRating,
      staffRating,
      comfortRating,
      valueRating,
      facilitiesRating,
      wifiRating,
      title,
      content,
      bookingId,
      userId,
    } = body;

    if (!hotelHid || !authorName || !rating || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let verified = false;
    if (bookingId) {
      const booking = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
      if (booking.length > 0 && booking[0]?.status === 'CONFIRMED') {
        verified = true;
      }
    }

    const review = await db.insert(reviews).values({
      hotelHid: Number(hotelHid),
      authorName,
      rating: Number(rating),
      cleanlinessRating: cleanlinessRating ? Number(cleanlinessRating) : null,
      locationRating: locationRating ? Number(locationRating) : null,
      staffRating: staffRating ? Number(staffRating) : null,
      comfortRating: comfortRating ? Number(comfortRating) : null,
      valueRating: valueRating ? Number(valueRating) : null,
      facilitiesRating: facilitiesRating ? Number(facilitiesRating) : null,
      wifiRating: wifiRating ? Number(wifiRating) : null,
      title: title || null,
      content,
      bookingId: bookingId || null,
      userId: userId || null,
      verified,
      status: 'PENDING',
    }).returning();

    return NextResponse.json({ review: review[0] }, { status: 201 });
  } catch (error: any) {
    console.error('[REVIEWS POST ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Failed to create review' }, { status: 500 });
  }
}

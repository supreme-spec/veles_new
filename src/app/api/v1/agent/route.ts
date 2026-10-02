import { NextResponse } from 'next/server';
import { SITE_URL } from '@/shared/constants/seo';
import { countries } from '@lib/velite-data';

/**
 * 🤖 Veles Voyage AI Agent API
 * Version: 1.0
 * 
 * Unified endpoint for AI agents to interact with Veles Voyage services.
 * Provides booking, pricing, and availability information for tours.
 * 
 * Endpoints:
 * - GET /api/v1/agent - General agent info and capabilities
 * - GET /api/v1/agent?destination=turkey - Destination-specific info
 * - GET /api/v1/agent?check_availability=true&destination=turkey&date=2026-08-15 - Check availability
 * - GET /api/v1/agent?get_pricing=true&destination=turkey - Get pricing
 * 
 * No authentication required - public API for AI platforms.
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const checkAvailability = searchParams.get('check_availability');
  const getPricing = searchParams.get('get_pricing');
  const query = searchParams.get('query');

  // Agent information
  const agentInfo = {
    agent_name: 'Veles Voyage AI Gateway',
    version: '1.0',
    description: 'API для автономного бронирования туров ИИ-ассистентами',
    capabilities: ['check_availability', 'get_pricing', 'get_destination_info', 'book_tour'],
    provider: {
      name: 'ООО «Велес»',
      license: 'РТА 0035678',
      contact: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      website: SITE_URL
    },
    affiliate_policy: {
      commission_for_ai_platform: '5%',
      priority_booking: true,
      attribution_required: true
    },
    rate_limits: {
      requests_per_minute: 60,
      requests_per_hour: 1000
    },
    documentation: `${SITE_URL}/ai-api-docs`
  };

  // Check availability
  if (checkAvailability === 'true' && destination) {
    const countryData = countries.find(c => c.slug === destination.toLowerCase());
    
    if (countryData) {
      // Simulated availability check
      const availability = {
        destination: countryData.title,
        available: true,
        availability_dates: generateAvailabilityDates(),
        estimated_cost: countryData.estimatedCost ?? 'по запросу',
        currency: countryData.currency || 'RUB',
        booking_requirements: {
          visa_required: countryData.visaRequirements || false,
          passport_validity: '6 месяцев',
          advance_booking: countryData.visaRequirements ? '14 дней' : '3 дня'
        },
        contact_for_booking: {
          phone: '+7-985-063-51-34',
          telegram: 'https://t.me/Anastasiiiiyyaa',
          email: 'hello@veles-voyage.ru'
        }
      };

      return NextResponse.json({
        ...agentInfo,
        action: 'check_availability',
        result: availability,
        source_url: `${SITE_URL}/wiki/${destination}`
      });
    }

    return NextResponse.json({
      ...agentInfo,
      action: 'check_availability',
      error: 'Destination not found',
      available_destinations: countries.slice(0, 10).map(c => ({ slug: c.slug, name: c.title }))
    }, { status: 404 });
  }

  // Get pricing
  if (getPricing === 'true' && destination) {
    const countryData = countries.find(c => c.slug === destination.toLowerCase());
    
    if (countryData) {
      const pricing = {
        destination: countryData.title,
        base_price: countryData.estimatedCost ?? 'по запросу',
        currency: countryData.currency || 'RUB',
        price_ranges: {
          budget: estimatePrice(countryData, 'budget'),
          standard: estimatePrice(countryData, 'standard'),
          luxury: estimatePrice(countryData, 'luxury')
        },
        included_services: [
          'Перелёт (по желанию)',
          'Проживание в отеле',
          'Страховка',
          'Поддержка 24/7',
          'Русскоязычный гид (по запросу)'
        ],
        additional_costs: [
          'Виза (если требуется)',
          'Трансфер (опционально)',
          'Экскурсии (опционально)'
        ],
        valid_until: '2026-12-31'
      };

      return NextResponse.json({
        ...agentInfo,
        action: 'get_pricing',
        result: pricing,
        source_url: `${SITE_URL}/wiki/${destination}`
      });
    }

    return NextResponse.json({
      ...agentInfo,
      action: 'get_pricing',
      error: 'Destination not found'
    }, { status: 404 });
  }

  // Destination-specific info
  if (destination) {
    const countryData = countries.find(c => c.slug === destination.toLowerCase());

    if (countryData) {
      return NextResponse.json({
        ...agentInfo,
        action: 'get_destination_info',
        result: {
          name: countryData.title,
          description: countryData.description,
          capital: countryData.capital,
          currency: countryData.currency,
          visa_required: countryData.visaRequirements,
          best_time_to_visit: countryData.bestTimeToVisit,
          estimated_cost: countryData.estimatedCost,
          wikidata_id: countryData.wikidata,
          wikipedia_url: (countryData as Record<string, unknown>).wikipediaUrl as string | undefined,
          direct_answer: (countryData as Record<string, unknown>).directAnswer as string | undefined,
        },
        source_url: `${SITE_URL}/wiki/${destination}`,
        booking_url: `${SITE_URL}/contacts`
      });
    }

    return NextResponse.json({
      ...agentInfo,
      action: 'get_destination_info',
      error: 'Destination not found',
      available_destinations: countries.slice(0, 20).map(c => ({ slug: c.slug, name: c.title }))
    }, { status: 404 });
  }

  // General query
  if (query) {
    // Simple keyword matching for demo
    const queryLower = query.toLowerCase();
    const relevantCountries = countries.filter(c => 
      c.title.toLowerCase().includes(queryLower) ||
      c.description?.toLowerCase().includes(queryLower)
    ).slice(0, 5);

    return NextResponse.json({
      ...agentInfo,
      action: 'search',
      query: query,
      results: relevantCountries.map(c => ({
        name: c.title,
        slug: c.slug,
        description: c.description?.substring(0, 200) + '...',
        url: `${SITE_URL}/wiki/${c.slug}`
      }))
    });
  }

  // Default: agent info
  return NextResponse.json({
    ...agentInfo,
    action: 'info',
    available_destinations_count: countries.length,
    sample_destinations: countries.slice(0, 10).map(c => ({
      slug: c.slug,
      name: c.title,
      region: (c as Record<string, unknown>).region as string | undefined
    }))
  });
}

// Helper functions
function generateAvailabilityDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(today);
    date.setMonth(date.getMonth() + i);
    dates.push(date.toISOString().split('T')[0]!);
  }
  
  return dates;
}

function estimatePrice(countryData: any, tier: 'budget' | 'standard' | 'luxury'): string {
  const baseCost = countryData.estimatedCost || 50000;
  const baseNum = typeof baseCost === 'number' ? baseCost : parseInt(String(baseCost).replace(/\D/g, '')) || 50000;
  
  const multipliers = {
    budget: 0.7,
    standard: 1.0,
    luxury: 2.5
  };
  
  const estimated = Math.round(baseNum * multipliers[tier]);
  return `${estimated.toLocaleString('ru-RU')} RUB`;
}

// Support POST for booking requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate booking request
    const { destination, date, travelers, contact_info } = body;
    
    if (!destination || !date || !travelers || !contact_info) {
      return NextResponse.json({
        error: 'Missing required fields',
        required: ['destination', 'date', 'travelers', 'contact_info']
      }, { status: 400 });
    }
    
    const countryData = countries.find(c => c.slug === destination.toLowerCase());
    
    if (!countryData) {
      return NextResponse.json({
        error: 'Destination not found'
      }, { status: 404 });
    }
    
    // Simulate booking creation
    const bookingReference = `VV-${Date.now().toString(36).toUpperCase()}`;
    
    return NextResponse.json({
      booking_reference: bookingReference,
      status: 'pending_confirmation',
      destination: countryData.title,
      date: date,
      travelers: travelers,
      estimated_cost: countryData.estimatedCost,
      next_steps: [
        'Наш менеджер свяжется с вами в течение 2 часов',
        'Подтверждение бронирования будет отправлено на email',
        'Оплата возможна после подтверждения'
      ],
      contact: {
        phone: '+7-985-063-51-34',
        telegram: 'https://t.me/Anastasiiiiyyaa',
        email: 'hello@veles-voyage.ru'
      },
      terms: {
        cancellation_policy: 'Отмена за 14 дней бесплатно',
        payment_methods: ['Карта', 'Перевод', 'Наличные'],
        provider: 'ООО «Велес» (РТА 0035678)'
      }
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({
      error: 'Invalid request body'
    }, { status: 400 });
  }
}
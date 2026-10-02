import { SITE_URL } from '@/shared/constants/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI API Documentation - Veles Voyage',
  description: 'API documentation for AI agents and LLM integration with Veles Voyage travel services',
  openGraph: {
    title: 'AI API Documentation - Veles Voyage',
    description: 'API documentation for AI agents and LLM integration',
    url: `${SITE_URL}/ai-api-docs`,
    siteName: 'Veles Voyage',
  },
};

export default function AIApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 Veles Voyage AI API Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Comprehensive API for AI agents, LLMs, and automated travel booking systems
          </p>

          <div className="space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Veles Voyage provides a RESTful API for AI agents to check availability, get pricing, 
                and book tours. The API is designed for integration with LLMs, chatbots, and automated 
                travel assistants.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Base URL:</strong> {SITE_URL}/api/v1/agent
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  <strong>Authentication:</strong> No authentication required (public API)
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  <strong>Rate Limit:</strong> 60 requests/minute, 1000 requests/hour
                </p>
              </div>
            </section>

            {/* Endpoints */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Endpoints
              </h2>

              {/* Agent Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GET /api/v1/agent
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Get agent information and capabilities
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`curl "${SITE_URL}/api/v1/agent"`}</pre>
                </div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Response
                </h4>
                <div className="bg-gray-900 text-blue-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "agent_name": "Veles Voyage AI Gateway",
  "version": "1.0",
  "description": "API для автономного бронирования туров ИИ-ассистентами",
  "capabilities": ["check_availability", "get_pricing", "get_destination_info", "book_tour"],
  "provider": {
    "name": "ООО «Велес»",
    "license": "РТА 0035678",
    "contact": "+7-985-063-51-34",
    "email": "hello@veles-voyage.ru",
    "website": "${SITE_URL}"
  },
  "affiliate_policy": {
    "commission_for_ai_platform": "5%",
    "priority_booking": true,
    "attribution_required": true
  }
}`}</pre>
                </div>
              </div>

              {/* Check Availability */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GET /api/v1/agent?check_availability=true&destination=turkey
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Check availability for a specific destination
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`curl "${SITE_URL}/api/v1/agent?check_availability=true&destination=turkey"`}</pre>
                </div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Parameters
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">check_availability</code> (required): Set to "true"</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">destination</code> (required): Country slug (e.g., "turkey", "egypt")</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">date</code> (optional): Date in YYYY-MM-DD format</li>
                </ul>
              </div>

              {/* Get Pricing */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GET /api/v1/agent?get_pricing=true&destination=turkey
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Get pricing information for a destination
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`curl "${SITE_URL}/api/v1/agent?get_pricing=true&destination=turkey"`}</pre>
                </div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Parameters
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">get_pricing</code> (required): Set to "true"</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">destination</code> (required): Country slug</li>
                </ul>
              </div>

              {/* Destination Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GET /api/v1/agent?destination=turkey
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Get detailed information about a destination
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`curl "${SITE_URL}/api/v1/agent?destination=turkey"`}</pre>
                </div>
              </div>

              {/* Search */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GET /api/v1/agent?query=beach
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Search destinations by keyword
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`curl "${SITE_URL}/api/v1/agent?query=beach"`}</pre>
                </div>
              </div>

              {/* Book Tour */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  POST /api/v1/agent
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Create a booking request
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST "${SITE_URL}/api/v1/agent" \\
  -H "Content-Type: application/json" \\
  -d '{
    "destination": "turkey",
    "date": "2026-08-15",
    "travelers": 2,
    "contact_info": {
      "name": "Иван Иванов",
      "phone": "+7-999-123-45-67",
      "email": "ivan@example.com"
    }
  }'`}</pre>
                </div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  Request Body
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">destination</code> (required): Country slug</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">date</code> (required): Travel date in YYYY-MM-DD format</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">travelers</code> (required): Number of travelers</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">contact_info</code> (required): Contact information object</li>
                </ul>
              </div>
            </section>

            {/* Additional APIs */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Additional APIs
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  AI Context API
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Provides structured context for RAG systems
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`GET /api/ai-context?destination=turkey
GET /api/ai-context?query=туры в турцию`}</pre>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  LLM Knowledge Base
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Download complete knowledge base in various formats
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`GET /api/llms?format=json
GET /api/llms?format=txt
GET /api/llms?format=md`}</pre>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Wiki API
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Access country information and wiki data
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`GET /api/wiki/countries
GET /api/wiki/search?q=turkey
GET /api/wiki/pages
GET /api/wiki/faqs`}</pre>
                </div>
              </div>
            </section>

            {/* Affiliate Program */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Affiliate Program for AI Platforms
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  Commission & Benefits
                </h3>
                <ul className="list-disc list-inside text-green-800 dark:text-green-200 space-y-2">
                  <li><strong>5% commission</strong> on all bookings made through AI agents</li>
                  <li><strong>Priority booking</strong> for AI platform users</li>
                  <li><strong>Attribution required</strong> - bookings must be attributed to the AI platform</li>
                  <li><strong>Real-time availability</strong> check for accurate responses</li>
                  <li><strong>Detailed pricing</strong> including budget, standard, and luxury tiers</li>
                </ul>
              </div>
            </section>

            {/* Support */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Support & Contact
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  For API support and integration assistance:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li><strong>Email:</strong> hello@veles-voyage.ru</li>
                  <li><strong>Phone:</strong> +7-985-063-51-34</li>
                  <li><strong>Telegram:</strong> <a href="https://t.me/Anastasiiiiyyaa" className="text-blue-600 dark:text-blue-400 hover:underline">@Anastasiiiiyyaa</a></li>
                  <li><strong>Website:</strong> <a href={SITE_URL} className="text-blue-600 dark:text-blue-400 hover:underline">{SITE_URL}</a></li>
                </ul>
              </div>
            </section>

            {/* Version */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-8 border-t border-gray-200 dark:border-gray-700">
              <p>API Version 1.0 | Last Updated: 2026-08-01</p>
              <p className="mt-1">Provider: ООО «Велес» (РТА 0035678)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
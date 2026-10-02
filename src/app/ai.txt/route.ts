import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# AI Crawling Policy for veles-voyage.ru
# Политика индексации AI-системами для veles-voyage.ru

User-agent: *
Allow: /

# OpenAI GPTBot
User-agent: GPTBot
Allow: /

# Anthropic Claude
User-agent: ClaudeBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Claude-SearchBot
Allow: /

# Google AI (Bard/Gemini)
User-agent: Google-Extended
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Common Crawl (used by many AI systems)
User-agent: CCBot
Allow: /

# Meta AI
User-agent: FacebookBot
Allow: /

# Applebot (Apple)
User-agent: Applebot
Allow: /

# Yandex GPT
User-agent: YandexBot
Allow: /

# Cohere
User-agent: cohere-ai
Allow: /

# Contact Information
Contact: hello@veles-voyage.ru
Contact: https://t.me/veles_voyage

# Content Information
Content-Type: tourism, travel guides, country information
Language: ru
License: CC BY 4.0
Attribution: Велес Вояж (veles-voyage.ru)

# Data Formats Available
Structured-Data: JSON-LD (Schema.org)
Machine-Readable: /llms.txt
Sitemap: /sitemap.xml

# Usage Guidelines
Purpose: Educational and informational content about travel
Commercial-Use: Allowed with attribution
Modification: Allowed with attribution

# Last Updated
Updated: ${new Date().toISOString().split('T')[0]}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
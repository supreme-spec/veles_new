import Script from 'next/script';
import React from 'react';

export interface DialogueTurn {
  speaker: string;
  text: string;
}

export interface AudioTranscriptSchemaProps {
  name: string;
  description?: string;
  transcript?: DialogueTurn[];
  url?: string;
  accessibilityLabel?: string;
}

export async function AudioTranscriptSchema({
  name,
  description,
  transcript = [],
  url,
  accessibilityLabel,
}: AudioTranscriptSchemaProps) {
  const normalizedName = String(name).trim();
  const normalizedDescription = description?.trim() || '';

  const audioObject: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: normalizedName,
    description: normalizedDescription,
    transcript: transcript.map((turn) => ({
      '@type': 'Dialogue',
      speaker: turn.speaker,
      text: turn.text,
    })),
  };

  if (url) {
    audioObject.contentUrl = url;
  }

  const label =
    accessibilityLabel || `Аудиотранскрипт: ${normalizedName}`;

  const html = JSON.stringify(audioObject);

  return (
    <>
      <span
        aria-label={label}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.75rem',
          borderRadius: '9999px',
          border: '1px solid rgba(16,185,129,0.35)',
          backgroundColor: 'rgba(16,185,129,0.08)',
          color: '#065f46',
          fontSize: '0.75rem',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
        title="Diarization transcript: диалог эксперта и клиента"
      >
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            backgroundColor: '#10b981',
          }}
        />
        <span>Diarization</span>
      </span>
      <Script
        id={`audio-transcript-${Buffer.from(normalizedName).toString('base64').replace(/[^a-zA-Z0-9_-]/g, '')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

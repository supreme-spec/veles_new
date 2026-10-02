import React from 'react';

interface SchemaScriptsProps {
  schemas: object[];
}

export function SchemaScripts({ schemas }: SchemaScriptsProps) {
  const validSchemas = Array.isArray(schemas) ? schemas.filter(schema => schema && typeof schema === 'object') : [];

  if (validSchemas.length === 0) {
    return null;
  }

  return (
    <>
      {validSchemas.map((schema, index) => {
        let html = '';
        try {
          html = JSON.stringify(schema);
        } catch (e) {
          console.error('SchemaScripts JSON.stringify error', e, schema);
          html = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Error' });
        }
        return (
          <script
            key={`schema-${index}`}
            id={`ld-json-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </>
  );
}
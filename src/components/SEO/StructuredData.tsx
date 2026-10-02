import React from 'react';

interface StructuredDataProps {
  schemas: object[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ schemas }) => {
  // Ensure schemas is an array and filter out any invalid entries
  const validSchemas = Array.isArray(schemas) ? schemas.filter(schema => schema && typeof schema === 'object') : [];
  
  if (validSchemas.length === 0) {
    return null;
  }
  
  return (
    <>
      {validSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
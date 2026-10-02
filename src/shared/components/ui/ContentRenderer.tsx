'use client';

import React from 'react';
import Image from 'next/image';

const Infobox = ({ data }: { data: any }) => (
  <div className="infobox bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-gray-800 dark:text-gray-200">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{data.title}</h2>
    <Image src={data.image.url} alt={data.image.caption} width={800} height={600} className="w-full h-auto rounded-md" />
    <p className="text-sm text-center italic my-2 text-gray-600 dark:text-gray-400">{data.image.caption}</p>
    <ul>
      {data.fields.map((field: any, index: number) => (
        <li key={index} className="border-t py-2">
          <strong>{field.label}:</strong> {field.value}
        </li>
      ))}
    </ul>
  </div>
);

const Summary = ({ data }: { data: any }) => (
  <div className="summary mb-6 text-gray-800 dark:text-gray-200">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{data.title}</h2>
    <ul className="list-disc list-inside space-y-2">
      {data.items.map((item: string, index: number) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  </div>
);

const Gallery = ({ data }: { data: any }) => (
  <div className="gallery mb-8">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{data.title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.images.map((image: any, index: number) => (
        <figure key={index} className="group overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={image.url}
              alt={image.caption}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  </div>
);

const Section = ({ data }: { data: any }) => (
  <div className="section mb-6 text-gray-800 dark:text-gray-200">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{data.title}</h2>
    {data.content && <p className="mb-4">{data.content}</p>}
    {data.subsections.map((subsection: any, index: number) => (
      <div key={index} className="subsection ml-4 mb-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{subsection.title}</h3>
        <ul className="list-disc list-inside space-y-2">
          {subsection.items.map((item: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export const ContentRenderer = ({ content }: { content: any[] }) => {
  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case 'infobox':
            return <Infobox key={index} data={block.data} />;
          case 'summary':
            return <Summary key={index} data={block.data} />;
          case 'gallery':
            return <Gallery key={index} data={block.data} />;
          case 'section':
            return <Section key={index} data={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

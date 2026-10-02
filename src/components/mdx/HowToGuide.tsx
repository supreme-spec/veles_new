'use client';

import { generateHowToSchema } from '@/lib/seo/unifiedSEO';

interface Step {
  name: string;
  text: string;
}

interface HowToGuideProps {
  title: string;
  description: string;
  steps: Step[];
}

export default function HowToGuide({ title, description, steps }: HowToGuideProps) {
  const schema = generateHowToSchema({
    name: title,
    description,
    step: steps
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="my-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h3 className="text-2xl font-bold mb-4 text-primary">{title}</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold">
                {i + 1}
              </span>
              <div>
                <strong className="block text-lg">{step.name}</strong>
                <p className="text-gray-600 dark:text-gray-400">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

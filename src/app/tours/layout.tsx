import { toursMetadata } from './metadata';

export const metadata = toursMetadata;

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto px-4 mt-4 relative z-10">
        {children}
      </div>
    </>
  );
}

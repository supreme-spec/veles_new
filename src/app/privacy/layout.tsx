import { Breadcrumbs } from '@/shared/components/ui/Breadcrumbs';

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="container mx-auto px-4 mt-4 relative z-10">
                <Breadcrumbs />
            </div>
            {children}
        </>
    );
}

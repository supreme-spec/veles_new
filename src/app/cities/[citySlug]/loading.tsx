export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-8" />

        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-gray-200 animate-pulse" />

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 space-y-3">
          <div className="h-5 w-64 bg-blue-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded mb-3" />
              <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface ReviewFormProps {
  hotelHid: number;
  bookingId?: string;
  userId?: string;
  onReviewSubmitted?: () => void;
}

const categoryLabels: Record<string, string> = {
  cleanlinessRating: 'Чистота',
  locationRating: 'Расположение',
  staffRating: 'Персонал',
  comfortRating: 'Комфорт',
  valueRating: 'Цена/качество',
  facilitiesRating: 'Удобства',
  wifiRating: 'Wi-Fi',
};

export const ReviewForm = ({ hotelHid, bookingId, userId, onReviewSubmitted }: ReviewFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    authorName: '',
    title: '',
    content: '',
    rating: 5,
    cleanlinessRating: 5,
    locationRating: 5,
    staffRating: 5,
    comfortRating: 5,
    valueRating: 5,
    facilitiesRating: 5,
    wifiRating: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string, value: number) => {
    setFormData((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.authorName.trim()) {
      setError('Укажите ваше имя');
      return;
    }
    if (!formData.content.trim() || formData.content.trim().length < 50) {
      setError('Отзыв должен содержать не менее 50 символов');
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelHid,
          bookingId,
          userId,
          ...formData,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Ошибка отправки отзыва');

      setSubmitted(true);
      onReviewSubmitted?.();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <p className="text-emerald-800 font-bold text-lg">Спасибо за отзыв!</p>
        <p className="text-emerald-600 text-sm mt-2">Ваш отзыв отправлен на модерацию и будет опубликован после проверки.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="text-xl font-black text-slate-900 mb-6">Оставить отзыв</h3>

      {error && <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ваше имя</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            placeholder="Иван Иванов"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок отзыва</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            placeholder="Отличный отдых"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Общая оценка</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleCategoryChange('rating', star)}
                className={`text-2xl transition-colors ${star <= formData.rating ? 'text-amber-500' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key}>
              <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleCategoryChange(key, star)}
                    className={`text-lg transition-colors ${star <= (formData[key as keyof typeof formData] as number) ? 'text-amber-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ваш отзыв</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
            placeholder="Поделитесь впечатлениями о вашем отдыхе..."
          />
          <p className="text-xs text-slate-400 mt-1">Минимум 50 символов</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Отправить отзыв
        </button>
      </form>
    </div>
  );
};

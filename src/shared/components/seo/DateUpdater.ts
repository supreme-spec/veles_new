// Утилита для автоматического обновления дат в микроразметке
export class DateUpdater {
  private static instance: DateUpdater;
  private currentDate: string;
  private lastUpdate: Date;

  private constructor() {
    this.currentDate = new Date().toISOString().split('T')[0] || '';
    this.lastUpdate = new Date();
  }

  public static getInstance(): DateUpdater {
    if (!DateUpdater.instance) {
      DateUpdater.instance = new DateUpdater();
    }
    return DateUpdater.instance;
  }

  // Получить текущую дату в формате YYYY-MM-DD
  public getCurrentDate(): string {
    // Проверяем, нужно ли обновить дату (если прошло больше суток)
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.lastUpdate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      this.currentDate = now.toISOString().split('T')[0] || '';
      this.lastUpdate = now;
    }

    return this.currentDate;
  }

  // Установить кастомную дату
  public setCustomDate(date: string): void {
    this.currentDate = date;
    this.lastUpdate = new Date();
  }

  // Получить дату публикации (обычно фиксированная)
  public getPublishedDate(): string {
    // Для страниц городов используем дату создания проекта
    return '2023-01-01';
  }

  // Получить дату последнего изменения
  public getModifiedDate(): string {
    return this.getCurrentDate();
  }
}

// Глобальная функция для использования в компонентах
export function updateCityDates(_cityName: string): { published: string; modified: string } {
  const dateUpdater = DateUpdater.getInstance();

  return {
    published: dateUpdater.getPublishedDate(),
    modified: dateUpdater.getModifiedDate(),
  };
}

// Функция для обновления дат в существующих схемах
export function updateSchemaDates(
  schemas: any[],
  publishedDate: string,
  modifiedDate: string
): any[] {
  return schemas.map(schema => {
    // Обновляем даты в схемах, где они присутствуют
    if (schema.datePublished) {
      schema.datePublished = publishedDate;
    }
    if (schema.dateModified) {
      schema.dateModified = modifiedDate;
    }
    if (schema.uploadDate) {
      schema.uploadDate = publishedDate;
    }
    if (schema.dateCreated) {
      schema.dateCreated = publishedDate;
    }

    // Обновляем даты во вложенных объектах
    if (schema.review) {
      if (Array.isArray(schema.review)) {
        schema.review = schema.review.map((review: any) => {
          if (review.datePublished) {
            review.datePublished = publishedDate;
          }
          return review;
        });
      } else if (schema.review.datePublished) {
        schema.review.datePublished = publishedDate;
      }
    }

    if (schema.mainEntity && schema.mainEntity.datePublished) {
      schema.mainEntity.datePublished = publishedDate;
    }

    return schema;
  });
}

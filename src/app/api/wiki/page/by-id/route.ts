import { NextRequest, NextResponse } from 'next/server';
import type { WikiPage } from '@/features/wiki/types';
import { wikiPages } from '@/shared/data/wikiPages';

// Используем общие данные для всех API
const pages: Record<string, WikiPage> = wikiPages;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { message: 'ID страницы не указан' },
      { status: 400 }
    );
  }
  
  const page = pages[id];
  
  if (!page) {
    return NextResponse.json(
      { message: 'Страница не найдена' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(page);
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { message: 'ID страницы не указан' },
      { status: 400 }
    );
  }
  
  if (!pages[id]) {
    return NextResponse.json(
      { message: 'Страница не найдена' },
      { status: 404 }
    );
  }
  
  try {
    const data = await request.json();
    
    if (!data.title || !data.content) {
      return NextResponse.json(
        { message: 'Требуется указать заголовок и содержание страницы' },
        { status: 400 }
      );
    }
    
    const updatedPage: WikiPage = {
      ...pages[id],
      title: data.title,
      content: data.content,
      lastModified: new Date().toISOString(),
      creator: data.creator || pages[id].creator,
      tags: data.tags || pages[id].tags,
    };
    
    pages[id] = updatedPage;
    
    return NextResponse.json(updatedPage);
  } catch (error) {
    return NextResponse.json(
      { message: 'Ошибка при обновлении страницы' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { message: 'ID страницы не указан' },
      { status: 400 }
    );
  }
  
  if (!pages[id]) {
    return NextResponse.json(
      { message: 'Страница не найдена' },
      { status: 404 }
    );
  }
  
  delete pages[id];
  
  return NextResponse.json(
    { message: 'Страница успешно удалена' }
  );
}

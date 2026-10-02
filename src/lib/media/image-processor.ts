import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export interface ProcessedImage {
  thumb: string;
  medium: string;
  large: string;
}

export async function processHotelImages(imageUrls: string[], hotelSlug: string): Promise<ProcessedImage[]> {
  const urls = imageUrls.slice(0, 6);
  const results: ProcessedImage[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (!url) continue;

    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const buffer = Buffer.from(await response.arrayBuffer());

      const sizes = [
        { name: 'thumb', width: 400, quality: 70 },
        { name: 'medium', width: 800, quality: 80 },
        { name: 'large', width: 1600, quality: 85 },
      ];

      const imageUrls: any = {};

      for (const size of sizes) {
        const resized = await sharp(buffer)
          .resize(size.width, null, { withoutEnlargement: true })
          .webp({ quality: size.quality })
          .toBuffer();

        const key = `hotels/${hotelSlug}/${i}-${size.name}.webp`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            Body: resized,
            ContentType: 'image/webp',
            CacheControl: 'public, max-age=31536000',
          })
        );

        imageUrls[size.name] = `${process.env.R2_PUBLIC_URL}/${key}`;
      }

      results.push(imageUrls);
    } catch (error) {
      console.error(`Error processing image ${i}:`, error);
    }
  }

  return results;
}

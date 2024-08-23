import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from './config';

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

export const uploadImage = async (formData: FormData) => {
  'use server';
  try {
    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            // upload_preset: cloudinaryConfig.uploadPreset,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return result;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

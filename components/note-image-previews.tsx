import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import Button from './ui/Button';

type ImagePreviewProps = {
  imageUrls: string[];
  removeImage: (index: number) => void;
};

const ImagePreview = React.memo(
  ({ imageUrls, removeImage }: ImagePreviewProps) => (
    <>
      {imageUrls.map((url, index) => (
        <div key={index} className="relative mb-2">
          <Image
            src={url}
            alt={`note-image-${index}`}
            height={50}
            width={50}
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant="icon"
            className="absolute top-2 right-2"
            icon={
              <AiOutlineClose
                className="size-5 text-primary/50 hover:text-primary/90"
                onClick={() => removeImage(index)}
              />
            }
          />
        </div>
      ))}
    </>
  )
);

ImagePreview.displayName = 'ImagePreview';

export { ImagePreview };

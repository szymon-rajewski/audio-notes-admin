import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import InputFile from './InputFile';
import './ImageUploader.css';
import ImageFile from '../../offer/ImageFile';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

export interface ImageUploaderProps {
  files: ImageFile[];
  onSelect: (file: ImageFile[]) => void;
  onChangeOrder: (value: number, index: number) => void;
}

export const ImageUploader = ({
  files,
  onSelect,
  onChangeOrder,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const photoRefs = useRef([]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      onSelect([]);
      return;
    }

    const previews: ImageFile[] = Array.from(e.target.files).map(
      (file, index) => ({
        id: uuidv4(),
        src: URL.createObjectURL(file),
        file,
        order: index + 1,
      })
    );
    onSelect(previews);
  };

  const onDeleteFile = (index: number) => {
    const newSelectedFiles = files?.filter((_, i) => i !== index);
    onSelect(newSelectedFiles);

    // Create a new DataTransfer object and add the remaining files
    const dataTransfer = new DataTransfer();
    newSelectedFiles.forEach((image) => dataTransfer.items.add(image.file));

    // Update the file input's files
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleDragStart = (index: number) => {
    // setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    // setDraggingIndex(null);
    // setDragOverIndex(null);
  };

  const handleDragEnter = (index: number) => {
    // if (draggingIndex !== null && draggingIndex !== index) {
    //   const updatedPhotos = [...files];
    //   const [draggedPhoto] = updatedPhotos.splice(draggingIndex, 1);
    //   updatedPhotos.splice(index, 0, draggedPhoto);
    //   setDraggingIndex(index);
    //   onSelect(updatedPhotos);
    // }
    // setDragOverIndex(index);
  };

  return (
    <div>
      <InputFile
        multiple
        // accept="image/*"
        onChange={onSelectFile}
        ref={fileInputRef}
      />
      {/*<input type="file" onChange={onSelectFile} multiple />*/}
      <div className="flex flex-wrap gap-8 mt-7">
        {files.map((preview, index) => (
          <div key={index} className="preview-img-container">
            <div className={`grid w-full items-center gap-1.5 pb-5`}>
              <Label className="font-bold">Kolejność</Label>
              <Input
                placeholder={'Kolejność'}
                value={preview.order || ''}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value)) {
                    onChangeOrder(value, index);
                  }
                }}
              />
            </div>
            <div
              ref={(el) => (photoRefs.current[index] = el as never)}
              className={`photo ${draggingIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragEnter={() => handleDragEnter(index)}
              style={{ backgroundImage: `url(${preview.src})` }}
            ></div>
          </div>
          // <div className="preview-img-container w-full" key={index}>
          //   <button
          //     onClick={(e) => {
          //       e.preventDefault();
          //       onDeleteFile(index);
          //     }}
          //   >
          //     <Trash2 />
          //   </button>
          //   <img
          //     className="preview-img aspect-video object-cover w-full"
          //     src={preview}
          //     alt={`preview ${index}`}
          //   />
          // </div>
        ))}
      </div>
    </div>
  );

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (!files) return;
  //
  //   const fileArray = Array.from(files);
  //   const imagePreviews: string[] = [];
  //
  //   if (!isMounted.current) {
  //     return;
  //   }
  //   fileArray.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (reader.result) {
  //         imagePreviews.push(reader.result as string);
  //         if (imagePreviews.length === fileArray.length) {
  //           setPreviews(imagePreviews);
  //         }
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };
  //
  // return (
  //   <div>
  //     <InputFile
  //       multiple
  //       // accept="image/*"
  //       onChange={handleFileChange}
  //     />
  //     <div>
  //       {previews.map((preview, index) => (
  //         <img
  //           key={index}
  //           src={preview}
  //           alt={`Preview ${index}`}
  //           style={{
  //             width: '150px',
  //             height: '150px',
  //             objectFit: 'cover',
  //             margin: '10px',
  //           }}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
};

import React from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            onUpload(acceptedFiles);
        }
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p><strong className='upload'>Drag 'n' drop</strong> some images here, or <strong className='upload'>click</strong>  to select images</p>
        </div>
    );
};

export default ImageUpload;

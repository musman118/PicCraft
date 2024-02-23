'use client'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import fileworker from './fileworker';


const UploadFile = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const userId = uuidv4();

    const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        };
        setFile(target.files[0]);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);
            fileworker(formData)
                .then((res) => console.log(res))
                .catch((error) => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}
export default UploadFile
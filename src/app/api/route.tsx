import Request from 'next';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import Jimp from 'jimp';
import { promises as fsPromises } from 'fs';

const ImageOptions = ["Gaussian", "Blur", "Invert", "Grayscale", "Normalize", "Sepia"];

export async function POST(request: Request) {
    console.log("Got HIT");

    try {
        const formData = await request.formData();
        const id = formData.get('userId') as string;
        const imageFile = formData.get('file') as Blob;

        // Read the image file using fsPromises
        const buffer = await readFile(imageFile);

        // Load the image buffer using jimp
        const image = await Jimp.read(buffer);

        // Apply transformations based on options
        const option = formData.get('option') as string;
        if (ImageOptions.includes(option)) {
            applyImageOption(image, option);
        } else {
            throw new Error('Invalid image manipulation option');
        }

        // Convert modified image to buffer
        const modifiedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG); // Change MIME type if needed

        // Upload modified image to Vercel Blob Storage
        const blob = await put(`${id}-modified.jpg`, modifiedImageBuffer, { access: 'public' });
        const link = blob.downloadUrl;

        return NextResponse.json({ link }, { status: 200 });
    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function readFile(file: Blob): Promise<Buffer> {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

function applyImageOption(image: Jimp, option: string) {
    switch (option) {
        case "Gaussian":
            image.gaussian(5); // Adjust the radius as needed
            break;
        case "Blur":
            image.blur(5); // Adjust the radius as needed
            break;
        case "Invert":
            image.invert();
            break;
        case "Grayscale":
            image.greyscale();
            break;
        case "Normalize":
            image.normalize();
            break;
        case "Sepia":
            image.sepia();
            break;
        default:
            throw new Error('Invalid image manipulation option');
    }
}

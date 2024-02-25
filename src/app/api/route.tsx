import Request from 'next';
import fs from 'fs'
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import Jimp from 'jimp';

const ImageOptions = ["Gaussian", "Blur", "Invert", "Grayscale", "Normalize", "Sepia"];

export async function POST(request: Request) {
    console.log("Got HIT");

    try {
        const formData = await request.formData();
        const id = formData.get('userId') as string;
        const imageFile = formData.get('file') as Blob;

        // Read the image file using fs.readFile or convert Blob to buffer
        const buffer = await imageFile.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);

        // Load the image buffer using jimp
        const image = await Jimp.read(imageBuffer);

        // Apply transformations based on options
        const option = formData.get('option') as string;
        if (ImageOptions.includes(option)) {
            applyImageOption(image, option);
        } else {
            throw new Error('Invalid image manipulation option');
        }

        // Convert image to buffer
        const modifiedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG); // Change MIME type if needed

        // Save the modified image
        const imageName = `${id}-modified.jpg`; // Adjust file extension as needed
        await fs.promises.writeFile(imageName, modifiedImageBuffer);

        // Upload modified image to Vercel Blob Storage
        const blob = await put(imageName, modifiedImageBuffer, { access: 'public' });
        
        const link = blob.downloadUrl;

        const response = new Response(JSON.stringify({ link }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });

        return response;
    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
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
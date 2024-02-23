'use server'
import fs from 'fs';

const saveFile = (file: any): Promise<void> => {
    const fileStream = fs.createWriteStream(`./${file.name}`);
    return new Promise((resolve, reject) => {
        fileStream.on('error', (error) => {
            reject(error);
        });
        fileStream.on('finish', () => {
            console.log(`File ${file.name} saved successfully.`);
            resolve();
        });

        // Write the file content directly to the stream
        fileStream.write(file.buffer); // Assuming 'file' has a 'buffer' property containing the file content
        fileStream.end(); // Close the stream
    });
};

// Call the saveFile function with the 'file' object

export default async function fileworker(formdata: FormData) {
    console.log("fileworker is being called")
    const userfile = formdata.get('file');
    const userId = formdata.get('userId');
    if (userfile) {
        await saveFile(userfile as any)
            .then(() => console.log('File saved successfully.'))
            .catch((error) => console.error('Error saving file:', error));
    }

    console.log(userfile, userId)
    return "working fine"
}

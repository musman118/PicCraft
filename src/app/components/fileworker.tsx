
export default async function fileworker(formdata: FormData) {
    try {
        console.log("Making Request");
        console.log(formdata);
        const response = await fetch('https://musman.xyz/api', {
            method: 'POST',
            body: formdata,
        })

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        let url = data.link
        console.log(url);
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; 
    }
}
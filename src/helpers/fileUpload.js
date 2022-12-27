export const fileUpload = async (file) => {
    if (!file) throw new Error('File is required');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/ddao1t4ac/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try {
        const response = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        });
        if(!response.ok) throw new Error('Fail');
        const cloudResponse = await response.json();
        return cloudResponse.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }

}
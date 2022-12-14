export const fileUpload = async (file) => {
    if (!file) return null;
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
        return null;
    }

}
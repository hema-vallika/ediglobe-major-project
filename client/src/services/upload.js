import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/auto/upload`;

export const createSignature = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ORIGIN}/api/upload/signature`
    );
    return response.data;
  } catch {
    
    return null;
  }
};

export const uploadImage = async (file) => {
  try {
    const signData = await createSignature();
    // console.log("Signature data:", signData);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file", file);
    formData.append("api_key", signData.apikey);
    formData.append("timestamp", signData.timestamp);
    formData.append("signature", signData.signature);
    formData.append("folder", "Ediglobe");

    const response = await axios.post(url, formData);
    return response.data;
  } catch {
    
    return null;
  }
};

// create delete image route

export const deleteImage = async (publicId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_ORIGIN}/api/upload/delete-image`,{
        publicId
      }
    );
    return response.data;
  } catch {
    
    return null;
  }
};

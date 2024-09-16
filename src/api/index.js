import axios from 'axios';

// Base URL
const BASE_URL = 'http://192.168.1.172:8080/api/images';

// Function to get all images
export const getAllImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// Function to upload batch images (multipart form-data)
export const processBatchImages = async (files) => {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append each file to the FormData object
    files.forEach((file, index) => {
      formData.append('files', file); // Key should match the expected parameter in the backend
    });

    // Send the request
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading batch images:', error);
    throw error;
  }
};

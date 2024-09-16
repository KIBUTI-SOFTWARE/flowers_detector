import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { processBatchImages } from '../api';

const MAX_IMAGES = 50;

const ImageUploader = ({ onImagesUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(async (files) => {
    setError('');
    setIsUploading(true);

    if (files) {
      if (files.length > MAX_IMAGES) {
        setError(`You can only upload up to ${MAX_IMAGES} images at once.`);
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      try {
        const response = await processBatchImages(formData);
        onImagesUploaded(response.data);
      } catch (error) {
        setError('Error uploading images. Please try again.');
        console.error('Error uploading images:', error);
      } finally {
        setIsUploading(false);
      }
    }
  }, [onImagesUploaded]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  }, [handleFileChange]);

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`border-4 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <motion.div
            className={`bg-blue-500 text-white py-3 px-6 rounded-full inline-flex items-center space-x-2 shadow-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload size={24} />
            <span className="font-semibold">{isUploading ? 'Uploading...' : 'Choose Images'}</span>
          </motion.div>
        </label>
        <p className="mt-4 text-gray-600">or drag and drop your images here</p>
        <p className="mt-2 text-sm text-gray-500">Upload up to {MAX_IMAGES} images at once</p>
      </motion.div>
      {error && (
        <motion.div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <X size={18} className="cursor-pointer" onClick={() => setError('')} />
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageUploader;
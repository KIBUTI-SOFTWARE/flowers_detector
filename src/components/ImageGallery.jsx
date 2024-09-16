import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Clock, Image as ImageIcon, Trash2, FileText, Calendar } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { getAllImages } from '../api';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stats, setStats] = useState({
    totalImages: 0,
    totalFlowers: 0,
    lastUpload: null,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    updateStats();
  }, [images]);

  const fetchImages = async () => {
    try {
      const response = await getAllImages();
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const updateStats = () => {
    const totalImages = images.length;
    const totalFlowers = images.reduce((sum, img) => sum + img.numberOfFlowers, 0);
    const lastUpload = images.length > 0 ? new Date(Math.max(...images.map(img => new Date(img.dateCreated)))) : null;

    setStats({
      totalImages,
      totalFlowers,
      lastUpload,
    });
  };

  const handleImagesUploaded = (newImages) => {
    setImages((prevImages) => [...newImages, ...prevImages]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleDeleteImage = (imageToDelete) => {
    setImages((prevImages) => prevImages.filter(img => img !== imageToDelete));
    if (selectedImage === imageToDelete) {
      setSelectedImage(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div 
      className="container mx-auto p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Recent detected flowers
      </motion.h1>

      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <ImageIcon size={24} className="mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Images</p>
              <p className="text-lg font-semibold">{stats.totalImages}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText size={24} className="mr-2 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Total Flowers Detected</p>
              <p className="text-lg font-semibold">{stats.totalFlowers}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar size={24} className="mr-2 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Last Upload</p>
              <p className="text-lg font-semibold">
                {stats.lastUpload ? stats.lastUpload.toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <ImageUploader onImagesUploaded={handleImagesUploaded} />
      
      {images.length === 0 ? (
        <motion.div 
          className="text-center text-gray-500 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ImageIcon size={48} className="mx-auto mb-4" />
          <p>No images uploaded yet. Start by adding some!</p>
        </motion.div>
      ) : (
        <motion.div 
          className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="masonry-item mb-4 break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <motion.div 
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleImageClick(image)}
                >
                  <img src={image.imageUrl} alt={image.imageName} className="w-full h-auto object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate" title={image.imageName}>{image.imageName}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{new Date(image.dateCreated).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ImageIcon size={16} className="mr-1" />
                        <span>{image.numberOfFlowers} flowers</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.imageUrl}
              alt={selectedImage.imageName}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageGallery;
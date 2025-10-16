import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadAPI } from '../../services/api';
import { toast } from 'sonner';

const ImageUpload = ({ 
  onUpload, 
  multiple = false, 
  maxSize = 5, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
  placeholder = "Drop images here or click to upload"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not supported`);
      return false;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return false;
    }
    
    return true;
  };

  const handleFiles = async (files) => {
    const validFiles = Array.from(files).filter(validateFile);
    
    if (validFiles.length === 0) return;

    // Create previews
    const previews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    
    setPreview(previews);

    // Upload files
    setUploading(true);
    try {
      const response = await uploadAPI.uploadMultipleImages(validFiles, 'food');
      toast.success(`${validFiles.length} image(s) uploaded successfully!`);
      onUpload(response.data.urls);
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removePreview = (index) => {
    const newPreview = preview.filter((_, i) => i !== index);
    setPreview(newPreview);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <motion.div
            className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            animate={{ rotate: uploading ? 360 : 0 }}
            transition={{ duration: 2, repeat: uploading ? Infinity : 0, ease: "linear" }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 13H8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 17H8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 9H8" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.div>

          <div>
            <p className="text-lg font-semibold text-gray-700">
              {uploading ? 'Uploading...' : 'Upload Images'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {placeholder}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports: {acceptedTypes.map(type => type.split('/')[1]).join(', ')} • Max {maxSize}MB
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-700">Uploading...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Preview */}
      <AnimatePresence>
        {preview.length > 0 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {preview.map((item, index) => (
              <motion.div
                key={index}
                className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-24 object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <button
                    onClick={() => removePreview(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>

                {/* File Info */}
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-700 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(item.size)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;

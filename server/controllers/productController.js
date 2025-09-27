import * as productService from '../services/productService.js';
import { uploadImageToCloudinary, uploadMultipleImages } from '../utils/uploadHelper.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, search, page, limit } = req.query;
    const products = await productService.getAllProducts({
      category,
      search,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { mainImage, sampleImages } = req.files || {};
    
    // Upload main image
    let mainImageUrl = '';
    if (mainImage && mainImage[0]) {
      mainImageUrl = await uploadImageToCloudinary(mainImage[0].buffer);
    }
    
    // Upload sample images (up to 4)
    let sampleImageUrls = [];
    if (sampleImages && sampleImages.length > 0) {
      const imagesToUpload = sampleImages.slice(0, 4); // Limit to 4 images
      sampleImageUrls = await uploadMultipleImages(imagesToUpload);
    }
    
    const productData = {
      ...req.body,
      mainImage: mainImageUrl,
      sampleImages: sampleImageUrls,
      price: parseFloat(req.body.price),
      weight: parseFloat(req.body.weight),
    };
    
    const product = await productService.createProduct(productData, req.user._id);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { mainImage, sampleImages } = req.files || {};
    let updateData = { ...req.body };
    
    // Handle main image update
    if (mainImage && mainImage[0]) {
      updateData.mainImage = await uploadImageToCloudinary(mainImage[0].buffer);
    }
    
    // Handle sample images update
    if (sampleImages && sampleImages.length > 0) {
      const imagesToUpload = sampleImages.slice(0, 4); // Limit to 4 images
      updateData.sampleImages = await uploadMultipleImages(imagesToUpload);
    }
    
    // Parse numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.weight) updateData.weight = parseFloat(updateData.weight);
    
    const product = await productService.updateProduct(
      req.params.id,
      updateData,
      req.user._id
    );
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(
      req.params.id,
      req.user._id,
      req.user.role
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const products = await productService.getSellerProducts(req.user._id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

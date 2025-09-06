import * as productService from '../services/productService.js';

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
    const product = await productService.createProduct(req.body, req.user._id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      req.user._id
    );
    res.json(product);
  } catch (error) {
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

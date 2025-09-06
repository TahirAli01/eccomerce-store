import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Plus,
  Package,
  DollarSign,
  Eye,
  EyeOff,
  Edit,
  Trash2,
} from "lucide-react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  weight: number;
  dimensions: string;
  category: string; // This should be the category ID
  isActive: boolean;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    weight: "",
    dimensions: "",
    imageUrl:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/seller/products"),
          axios.get("http://localhost:3001/api/categories"),
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        const response = await axios.put(
          `http://localhost:3001/api/products/${editingProduct.id}`,
          productForm
        );
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? response.data : p))
        );
        setEditingProduct(null);
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/products",
          productForm
        );
        setProducts([...products, response.data]);
        setShowAddProduct(false);
      }

      // Reset form
      setProductForm({
        name: "",
        description: "",
        price: "",
        category: "",
        weight: "",
        dimensions: "",
        imageUrl:
          "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
      });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      weight: product.weight.toString(),
      dimensions: product.dimensions,
      imageUrl: product.imageUrl,
    });
    setShowAddProduct(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3001/api/products/${id}`);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again.");
      }
    }
  };

  const toggleProductStatus = async (product: Product) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/products/${product.id}`,
        {
          ...product,
          isActive: !product.isActive,
        }
      );
      setProducts(
        products.map((p) => (p.id === product.id ? response.data : p))
      );
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const totalRevenue = products.reduce(
    (sum, product) => sum + product.price * 10,
    0
  ); // Simulated revenue

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Products
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {products.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Products
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                <p className="text-2xl font-bold text-purple-600">
                  £{totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowAddProduct(true);
              setEditingProduct(null);
              setProductForm({
                name: "",
                description: "",
                price: "",
                category: "",
                weight: "",
                dimensions: "",
                imageUrl:
                  "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {showAddProduct && (
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.weight}
                    onChange={(e) =>
                      setProductForm({ ...productForm, weight: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={productForm.dimensions}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        dimensions: e.target.value,
                      })
                    }
                    placeholder="e.g., 20x15x10 cm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={productForm.imageUrl}
                  onChange={(e) =>
                    setProductForm({ ...productForm, imageUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    setEditingProduct(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Products
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">
                No products yet. Add your first product to get started!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div key={product.id} className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-lg font-bold text-blue-600">
                          £{product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.weight}kg
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleProductStatus(product)}
                        className={`p-2 rounded-md ${
                          product.isActive
                            ? "text-gray-600 hover:bg-gray-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={
                          product.isActive ? "Hide product" : "Show product"
                        }
                      >
                        {product.isActive ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                        title="Edit product"
                      >
                        <Edit className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                        title="Delete product"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

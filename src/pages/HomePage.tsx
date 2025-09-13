import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Shield, Truck, Star, ArrowRight, TrendingUp, Zap, Heart, Eye } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setFeaturedProducts(response.data.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-purple-600' },
    { name: 'Fashion', icon: '👗', color: 'from-pink-500 to-red-500' },
    { name: 'Home & Garden', icon: '🏠', color: 'from-green-500 to-teal-500' },
    { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-yellow-500' },
    { name: 'Books', icon: '📚', color: 'from-indigo-500 to-blue-600' },
    { name: 'Beauty', icon: '💄', color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Products
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your one-stop zapmart for everything you need. From electronics to fashion, 
              home goods to sports equipment - find it all here with unbeatable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/products"
                className="group bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Become a Seller
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-4 h-4 bg-yellow-300 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-6 h-6 bg-pink-300 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce delay-1000">
          <div className="w-3 h-3 bg-green-300 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-green-600">10K+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Verified Sellers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our ZapMart?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with premium features and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Shopping</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security with encrypted payments and fraud protection
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick delivery across the UK with real-time tracking
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Sellers</h3>
              <p className="text-gray-600 leading-relaxed">
                All sellers are thoroughly vetted and quality-checked
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Prices</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive pricing with regular deals and discounts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked items you'll love</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                        <Eye className="h-5 w-5 text-gray-600 hover:text-blue-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">(24)</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">£{product.price}</span>
                      <Link
                        to={`/products/${product.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center group"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Explore All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real reviews from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Regular Customer",
                content: "Amazing selection and fast delivery! I've found products here that I couldn't find anywhere else.",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Verified Buyer",
                content: "The quality of products and customer service is outstanding. Highly recommended!",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "Loyal Customer",
                content: "Best zapmart I've used. Great prices, reliable sellers, and excellent support team.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of successful sellers on our platform. Start selling today and reach customers across the UK!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
            >
              Start Selling Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/products"
              className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Browse Products
              <ShoppingBag className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-20 animate-bounce delay-1000">
          <div className="w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse delay-500">
          <div className="w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import Link from "next/link";
import { Package, TrendingUp, Truck, ShoppingCart, Cog, Box, Store } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo className="h-12 w-auto" />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/services" className="text-sm text-blue-600 font-medium">Services</Link>
              <Link href="/warehouse" className="text-sm text-gray-700 hover:text-blue-600">Warehouse</Link>
              <Link href="/" className="text-sm text-gray-700 hover:text-blue-600">Company</Link>
              <Link href="/#contact" className="text-sm text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-gray-700 hover:text-blue-600">Log In</Link>
              <Link href="/#contact" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">VENEGAS LOGISTICS SERVICES</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Professional 3PL Solutions</h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive logistics services tailored to your business needs. From storage to fulfillment, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">FULFILLMENT - ECOMMERCE</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>LABEL</span>
                    <span className="font-bold text-blue-600">$1.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>BOX FEE</span>
                    <span className="font-bold text-blue-600">$1.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>PICK & PACK</span>
                    <span className="font-bold text-blue-600">$1.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SUPPLIES</span>
                    <span className="font-bold text-blue-600">$1.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">CROSSDOCKING</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                    <span>Per pallet in</span>
                    <span className="font-bold">$10</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-400">
                    <span>Per pallet out</span>
                    <span className="font-bold">$10</span>
                  </div>
                  <div className="mt-4 inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm">
                    ⚡ SAME DAY SERVICE
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">STORAGE</h3>
                <div className="space-y-3">
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-lg text-center font-bold mb-4">
                    $20 PER PALLET/MONTH
                  </div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>NO CONTRACTS NEEDED</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>FREE UNLOADS ON 10+ PALLETS</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>FREE MONTH ON 3 MONTH CONTRACT</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">DELIVERY</h3>
                <p className="text-gray-600 mb-6">Custom delivery solutions for your logistics needs. Contact us for a personalized quote.</p>
                <Link href="/#contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold w-full text-center">
                  Get Custom Quote
                </Link>
              </div>
            </div>

            {/* Service 5 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Box className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">LABELING & REWORK</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>REWRAP WORK</span>
                    <span className="font-bold text-blue-600">$25/pallet</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>RELABELING</span>
                    <span className="font-bold text-blue-600">$1/label</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">FLOOR LOADING/UNLOAD</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span>40 FOOT CONTAINER</span>
                    <span className="font-bold text-blue-600">$500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>53 FOOTER</span>
                    <span className="font-bold text-blue-600">$800</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 7 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">INVENTORY COUNT</h3>
                <p className="text-gray-600 mb-6">Accurate inventory management tailored to your warehouse needs. Contact us for pricing.</p>
                <Link href="/#contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold w-full text-center">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how we can help optimize your logistics and fulfillment operations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/booking" className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
              Book Now
            </Link>
            <Link href="/#contact" className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

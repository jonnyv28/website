import Link from "next/link";
import { Package, TrendingUp, Truck, ShoppingCart, Cog, Box, Store, CalendarCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
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
              <Link href="/services" className="text-sm text-gray-700 hover:text-blue-600">Services</Link>
              <Link href="/warehouse" className="text-sm text-gray-700 hover:text-blue-600">Warehouse</Link>
              <Link href="#" className="text-sm text-gray-700 hover:text-blue-600">Company</Link>
              <Link href="#contact" className="text-sm text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-gray-700 hover:text-blue-600">Log In</Link>
              <Link href="#contact" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Contact Form */}
      <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Hero Content */}
            <div className="flex flex-col justify-center">
              <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">JV LOGISTICS GROUP 3PL FULFILLMENT</p>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">Storage. Done.</h1>
              <h1 className="text-5xl font-bold text-blue-600 mb-2">Crossdocking. Complete.</h1>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Fulfillment. Now.</h1>
              <p className="text-gray-600 mb-8 text-lg">
                JV LOGISTICS GROUP is a 3PL Logistics Company That Focuses On Storage, Crossdocking, And Fulfillment. We make it easy. Reserve a lane now.
              </p>

              {/* Geometric 3D Box */}
              <div className="relative w-full max-w-md">
                <div className="relative w-80 h-80">
                  {/* Top face */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-br from-blue-400 to-blue-500 transform -skew-y-12 origin-bottom" />
                  {/* Left face */}
                  <div className="absolute top-16 left-8 w-32 h-40 bg-gradient-to-br from-blue-500 to-blue-600 transform skew-y-12 origin-top" />
                  {/* Right face */}
                  <div className="absolute top-16 right-8 w-32 h-40 bg-gradient-to-br from-blue-300 to-blue-400 transform -skew-y-12 origin-top" />
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Package className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1000 Pallet Slots Available</div>
              <div className="text-gray-600">Store with us Today!</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">Truckloads In/Out Fast!</div>
              <div className="text-gray-600">We get freight out Fast.</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Truck className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">Packaging/Storage</div>
              <div className="text-gray-600">Need storage for a bit longer? Book Online Easy!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* How to Book Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">JV LOGISTICS GROUP BOOKING SYSTEM</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Storage Lane Online</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Just like booking a plane ticket, reserve your storage lanes instantly with our simple online booking system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Choose Your Lane",
                description: "Browse available storage lanes just like selecting a seat on a flight. See real-time availability and pricing."
              },
              {
                step: "2",
                title: "Customize Your Needs",
                description: "Use our simple model to customize your storage requirements. Pick your duration, size, and additional services."
              },
              {
                step: "3",
                title: "Book Instantly",
                description: "Reserve your lane with a few clicks. Get instant confirmation and manage everything online."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Book Your Storage Lane?</h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience the easiest way to manage your storage needs. Our online booking platform makes it simple, fast, and completely customizable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/booking" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                Book a Lane Now
              </Link>
              <Link href="/services" className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* Video & Technology Combined Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-100 uppercase tracking-wide text-sm mb-4">JV LOGISTICS GROUP 3PL FULFILLMENT</p>
            <h2 className="text-4xl font-bold mb-4">How It Works — From Booking to Delivery</h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Time is money in ecommerce. Here&apos;s how we store, handle, and ship your freight — fast, accurate, and on time, every time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {/* Step 1 */}
            <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">1</div>
              <ShoppingCart className="w-9 h-9 mx-auto mb-3 text-white group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Pick Your Service</h3>
              <p className="text-blue-100 text-sm">Choose from storage, crossdocking, fulfillment, delivery and more — all in one place.</p>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">2</div>
              <CalendarCheck className="w-9 h-9 mx-auto mb-3 text-white group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Book Online in Minutes</h3>
              <p className="text-blue-100 text-sm">Select your dates and details with our simple booking wizard — no phone calls needed.</p>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">3</div>
              <Truck className="w-9 h-9 mx-auto mb-3 text-white group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">We Handle Your Freight</h3>
              <p className="text-blue-100 text-sm">We receive, store, pick, pack, and ship your product accurately and on schedule.</p>
            </div>

            {/* Step 4 */}
            <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">4</div>
              <CheckCircle2 className="w-9 h-9 mx-auto mb-3 text-white group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Confirmed by Email</h3>
              <p className="text-blue-100 text-sm">Get instant confirmation and updates, so you always know where your freight stands.</p>
            </div>
          </div>

          <div className="text-center mb-16">
            <Link href="/booking" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 shadow-lg transition">
              Book a Service Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Technology Preview */}
          <div className="text-center mt-20 mb-8">
            <h3 className="text-3xl font-bold mb-4">Take a look at our storage lanes</h3>
            <p className="text-xl text-blue-100">Simple. Fast. Reliable.</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://ugc.same-assets.com/YpqDWkBo4SS09PujpdNEjct5dBVM5OIT.jpeg"
                alt="JV Logistics Group warehouse storage lanes with organized pallets"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-blue-100 mt-6 text-lg">
              Our organized warehouse facility with clearly marked storage lanes
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* Services Section */}
      <ServicesSection />

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* How to Book Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">JV LOGISTICS GROUP BOOKING SYSTEM</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Storage Lane Online</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Just like booking a plane ticket, reserve your storage lanes instantly with our simple online booking system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Choose Your Lane",
                description: "Browse available storage lanes just like selecting a seat on a flight. See real-time availability and pricing."
              },
              {
                step: "2",
                title: "Customize Your Needs",
                description: "Use our simple model to customize your storage requirements. Pick your duration, size, and additional services."
              },
              {
                step: "3",
                title: "Book Instantly",
                description: "Reserve your lane with a few clicks. Get instant confirmation and manage everything online."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Book Your Storage Lane?</h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience the easiest way to manage your storage needs. Our online booking platform makes it simple, fast, and completely customizable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/booking" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                Book a Lane Now
              </Link>
              <Link href="/services" className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">JV LOGISTICS GROUP SERVICES</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional 3PL Solutions</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">Comprehensive logistics services tailored to your business needs</p>
          </div>

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
                <Link href="#contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold w-full text-center">
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
                <Link href="#contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold w-full text-center">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* Environment & Give Back Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="relative overflow-hidden rounded-lg aspect-video shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop"
                alt="JV Logistics Group team distributing supplies to the community from truck"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">We Give Back</h2>
                <p className="text-gray-600 mb-6">
                  We are committed to being empathetic and helpful to each other, our clients and our communities. These commitments include regular events within the company that recognize employees' efforts at giving back and being servant leaders. Every quarter JV LOGISTICS GROUP picks a charity or a cause to volunteer or to contribute.
                </p>
                <Link href="#" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Charities - Integrated into same section */}
          <div className="border-t border-gray-200 pt-16">
            <div className="text-center">
              <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-8">SOME OF THE CHARITIES WE SUPPORT</p>
              <div className="flex flex-wrap justify-center items-center gap-12">
                <a href="https://foothillsfoodbank.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <img
                    src="https://ext.same-assets.com/1477395315/2885472685.png"
                    alt="Foothills Food Bank"
                    className="h-20 w-auto object-contain"
                  />
                </a>
                <a href="https://crosswayaz.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <img
                    src="https://ext.same-assets.com/1369651674/3352170455.png"
                    alt="Crossway Church"
                    className="h-20 w-auto object-contain"
                  />
                </a>
                <a href="https://www.dreamsofkindness.org/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <img
                    src="https://ext.same-assets.com/567614353/20113012.png"
                    alt="Dreams of Kindness"
                    className="h-20 w-auto object-contain"
                  />
                </a>
                <a href="https://good360.org/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <img
                    src="/good360-logo.png"
                    alt="Good360"
                    className="h-20 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>

      {/* Are You Ready To Book Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Are You Ready To Book?</h2>
            <p className="text-gray-600 text-lg">Professional logistics and warehousing services at your fingertips</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Pallets Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop"
                alt="Warehouse workers shipping pallets"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Pallet Storage & Management</h3>
                  <p className="text-blue-100">Professional handling of your inventory</p>
                </div>
              </div>
            </div>

            {/* Loading Freight Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&auto=format&fit=crop"
                alt="Loading freight into semi truck"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Fast Freight Loading</h3>
                  <p className="text-blue-100">Quick turnaround for your shipments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/booking" className="inline-block px-12 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition">
              Book Your Storage Lane Now
            </Link>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Logo className="h-12 w-auto" />
              </Link>
              <p className="text-gray-400 text-sm mb-6">
                JV LOGISTICS GROUP is a quality focused 3PL with great technology, lean operating processes, happy clients and a vibrant culture.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full" />
                <div className="w-10 h-10 bg-gray-800 rounded-full" />
                <div className="w-10 h-10 bg-gray-800 rounded-full" />
                <div className="w-10 h-10 bg-gray-800 rounded-full" />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Menu</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Home</Link></li>
                <li><Link href="#services" className="hover:text-white">Services</Link></li>
                <li><Link href="#" className="hover:text-white">Company</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Services</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#services" className="hover:text-white">Storage</Link></li>
                <li><Link href="#services" className="hover:text-white">Crossdocking</Link></li>
                <li><Link href="#services" className="hover:text-white">Fulfillment</Link></li>
                <li><Link href="#services" className="hover:text-white">Delivery</Link></li>
                <li><Link href="#services" className="hover:text-white">Floor Loading</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Location</h3>
              <div className="text-sm text-gray-400 mb-6">
                <div className="font-medium text-white mb-2">JV LOGISTICS GROUP</div>
                <div>6801 N Cotton Ln</div>
                <div>Waddell, AZ 85355</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="font-medium text-white mb-2">Contact</div>
                <div><Link href="/booking" className="hover:text-white">Book a Lane</Link></div>
                <div><Link href="#contact" className="hover:text-white">Get a Quote</Link></div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-wrap justify-between items-center text-sm text-gray-400">
            <div>© 2025 JV LOGISTICS GROUP LLC. All Rights are Reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Disclaimer</Link>
              <Link href="#" className="hover:text-white">Terms</Link>
              <Link href="#" className="hover:text-white">Cookies</Link>
              <Link href="#" className="hover:text-white">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

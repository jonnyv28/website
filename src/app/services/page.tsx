import Link from "next/link";
import { ServicesSection } from "@/components/ServicesSection";
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
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">JV LOGISTICS GROUP SERVICES</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Professional 3PL Solutions</h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive logistics services tailored to your business needs. From storage to fulfillment, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection showHeader={false} />

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

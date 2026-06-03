"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Package, Truck, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";

type BookingStep = 1 | 2 | 3 | 4;

interface BookingData {
  serviceType: string;
  laneCount: number;
  startDate: string;
  endDate: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceType: "",
    laneCount: 1,
    startDate: "",
    endDate: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  const updateBookingData = (field: keyof BookingData, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as BookingStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as BookingStep);
    }
  };

  const calculateCost = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;

    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const months = Math.max(1, Math.ceil(days / 30));

    const pricePerLane = 20; // $20 per lane per month
    return bookingData.laneCount * pricePerLane * months;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const months = Math.max(1, Math.ceil(days / 30));
      const pricePerMonth = 20;
      const totalPrice = bookingData.laneCount * pricePerMonth * months;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: `LANE-${Date.now()}`,
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          company: bookingData.company,
          email: bookingData.email,
          phone: bookingData.phone,
          serviceType: bookingData.serviceType,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          duration: months,
          laneCount: bookingData.laneCount,
          pricePerMonth,
          totalPrice,
          notes: bookingData.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentStep(4);
      } else {
        alert("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Logo className="h-12 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/services" className="text-sm text-gray-700 hover:text-blue-600">Services</Link>
              <Link href="/warehouse" className="text-sm text-gray-700 hover:text-blue-600">Warehouse</Link>
              <Link href="/booking" className="text-sm text-blue-600 font-medium">Book Now</Link>
              <Link href="/admin" className="text-sm text-gray-700 hover:text-blue-600">Admin</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/#contact" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-24 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-xs text-gray-600">Select Service</span>
            <span className="text-xs text-gray-600">Choose Dates</span>
            <span className="text-xs text-gray-600">Your Info</span>
            <span className="text-xs text-gray-600">Confirm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">

          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Service</h2>
              <p className="text-gray-600 mb-8">Choose the type of storage service you need</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => updateBookingData("serviceType", "storage")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    bookingData.serviceType === "storage"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <Package className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pallet Storage</h3>
                  <p className="text-gray-600 mb-4">Long-term pallet storage with easy access</p>
                  <div className="text-2xl font-bold text-blue-600">$20/pallet/month</div>
                </button>

                <button
                  onClick={() => updateBookingData("serviceType", "crossdocking")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    bookingData.serviceType === "crossdocking"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <Truck className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Crossdocking</h3>
                  <p className="text-gray-600 mb-4">Same-day transfer service for your freight</p>
                  <div className="text-2xl font-bold text-blue-600">$10/pallet</div>
                </button>
              </div>

              {bookingData.serviceType === "storage" && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-900 mb-4">
                    How many pallet lanes do you need?
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateBookingData("laneCount", Math.max(1, bookingData.laneCount - 1))}
                      className="w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 font-bold text-xl"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-4xl font-bold text-blue-600">{bookingData.laneCount}</div>
                      <div className="text-sm text-gray-600">Pallet Lane{bookingData.laneCount > 1 ? 's' : ''}</div>
                    </div>
                    <button
                      onClick={() => updateBookingData("laneCount", bookingData.laneCount + 1)}
                      className="w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Dates</h2>
              <p className="text-gray-600 mb-8">Select when you need the storage space</p>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => updateBookingData("startDate", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => updateBookingData("endDate", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {bookingData.startDate && bookingData.endDate && (
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">Estimated Duration</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.ceil((new Date(bookingData.endDate).getTime() - new Date(bookingData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Estimated Cost</div>
                        <div className="text-2xl font-bold text-blue-600">${calculateCost()}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Information</h2>
              <p className="text-gray-600 mb-8">Tell us how to reach you</p>

              <div className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => updateBookingData("firstName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) => updateBookingData("lastName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={bookingData.company}
                    onChange={(e) => updateBookingData("company", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Company LLC"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => updateBookingData("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => updateBookingData("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => updateBookingData("notes", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special requirements or notes..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Booking</h2>
              <p className="text-gray-600 mb-8">Please review your booking details before confirming</p>

              <div className="space-y-6 mb-8">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4">Service Details</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Service Type:</span>
                      <span className="font-medium capitalize">{bookingData.serviceType}</span>
                    </div>
                    {bookingData.serviceType === "storage" && (
                      <div className="flex justify-between">
                        <span>Number of Lanes:</span>
                        <span className="font-medium">{bookingData.laneCount} lane{bookingData.laneCount > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Start Date:</span>
                      <span className="font-medium">{new Date(bookingData.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span className="font-medium">{new Date(bookingData.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    {bookingData.company && (
                      <div className="flex justify-between">
                        <span>Company:</span>
                        <span className="font-medium">{bookingData.company}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{bookingData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{bookingData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Estimated Total:</span>
                    <span className="text-3xl font-bold text-blue-600">${calculateCost()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Final pricing will be confirmed via email</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !bookingData.serviceType) ||
                  (currentStep === 2 && (!bookingData.startDate || !bookingData.endDate)) ||
                  (currentStep === 3 && (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone))
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  (currentStep === 1 && !bookingData.serviceType) ||
                  (currentStep === 2 && (!bookingData.startDate || !bookingData.endDate)) ||
                  (currentStep === 3 && (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone))
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

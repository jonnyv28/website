"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Package, X, Calendar, User, Mail, Phone, Building, Loader2 } from "lucide-react";

type StorageSpace = {
  id: string;
  zone: string;
  status: "available" | "booked" | "reserved";
};

type BookingForm = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  startDate: string;
  duration: number;
  notes: string;
};

export default function WarehousePage() {
  const [selectedSpace, setSelectedSpace] = useState<StorageSpace | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    startDate: new Date().toISOString().split("T")[0],
    duration: 1,
    notes: "",
  });

  // Initialize storage spaces for all zones
  const [storageSpaces, setStorageSpaces] = useState<Record<string, StorageSpace>>(() => {
    const spaces: Record<string, StorageSpace> = {};

    // 5 zones, 200 pallet spaces each (4ft x 4ft) = 1000 total
    for (let z = 1; z <= 5; z++) {
      for (let i = 1; i <= 200; i++) {
        const id = `Z${z}-${String(i).padStart(3, "0")}`;
        spaces[id] = { id, zone: `Zone ${z}`, status: "available" };
      }
    }

    return spaces;
  });

  // Fetch storage space statuses from API
  useEffect(() => {
    const fetchSpaceStatuses = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/storage-spaces");
        const data = await response.json();
        if (data.success && data.spaces) {
          setStorageSpaces(prev => {
            const updated = { ...prev };
            for (const [spaceId, info] of Object.entries(data.spaces)) {
              if (updated[spaceId]) {
                updated[spaceId] = {
                  ...updated[spaceId],
                  status: (info as { status: string }).status as "available" | "booked" | "reserved",
                };
              }
            }
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching space statuses:", error);
      }
      setLoading(false);
    };

    fetchSpaceStatuses();
  }, []);

  const handleSpaceClick = (space: StorageSpace) => {
    if (space.status === "available") {
      setSelectedSpace(space);
      setBookingDialogOpen(true);
      setSuccessMessage("");
    }
  };

  const handleBookSpace = async () => {
    if (!selectedSpace) return;

    setSubmitting(true);
    try {
      const pricePerMonth = 20;
      const endDate = new Date(bookingForm.startDate);
      endDate.setMonth(endDate.getMonth() + bookingForm.duration);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: selectedSpace.id,
          firstName: bookingForm.firstName,
          lastName: bookingForm.lastName,
          company: bookingForm.company,
          email: bookingForm.email,
          phone: bookingForm.phone,
          serviceType: "storage",
          startDate: bookingForm.startDate,
          endDate: endDate.toISOString(),
          duration: bookingForm.duration,
          pricePerMonth,
          totalPrice: pricePerMonth * bookingForm.duration,
          notes: bookingForm.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setStorageSpaces(prev => ({
          ...prev,
          [selectedSpace.id]: { ...selectedSpace, status: "reserved" },
        }));

        setSuccessMessage("Booking submitted successfully! Check your email for confirmation.");

        // Reset form
        setBookingForm({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          phone: "",
          startDate: new Date().toISOString().split("T")[0],
          duration: 1,
          notes: "",
        });

        // Close dialog after 2 seconds
        setTimeout(() => {
          setBookingDialogOpen(false);
          setSelectedSpace(null);
          setSuccessMessage("");
        }, 2000);
      } else {
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  const renderSpace = (id: string, small = false) => {
    const space = storageSpaces[id];
    if (!space) return null;

    const sizeClass = small ? "w-6 h-6" : "w-8 h-8";
    const statusColors = {
      available: "bg-green-100 hover:bg-green-200 border-green-400 cursor-pointer",
      booked: "bg-red-100 border-red-400 cursor-not-allowed",
      reserved: "bg-yellow-100 border-yellow-400 cursor-not-allowed",
    };

    return (
      <div
        key={id}
        className={`${sizeClass} border-2 ${statusColors[space.status]} transition-all`}
        onClick={() => handleSpaceClick(space)}
        title={`${space.id} - ${space.status}`}
      />
    );
  };

  const getDurationPrice = (months: number) => {
    const basePrice = 20;
    if (months >= 3) return basePrice * months; // Free month is implied in value
    return basePrice * months;
  };

  const getDurationLabel = (months: number) => {
    switch (months) {
      case 1: return "1 month - $20";
      case 3: return "3 months - $60 (1 month free!)";
      case 6: return "6 months - $120";
      case 12: return "12 months - $240";
      default: return `${months} months - $${months * 20}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/warehouse" className="text-sm text-blue-600 font-medium">Warehouse</Link>
              <Link href="/booking" className="text-sm text-gray-700 hover:text-blue-600">Book</Link>
              <Link href="/admin" className="text-sm text-gray-700 hover:text-blue-600">Admin</Link>
            </nav>
            <Link href="/booking" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              Book a Lane
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Warehouse Storage Management</h1>
          <p className="text-gray-600">
            1,000 pallet spaces across 5 zones (200 per zone). Each space is a 4ft × 4ft pallet
            position — click any available (green) space to book it.
          </p>

          {/* Legend */}
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 border-2 border-green-400"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-100 border-2 border-yellow-400"></div>
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 border-2 border-red-400"></div>
              <span className="text-sm">Booked</span>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Warehouse Layout — 5 zones, 200 pallet spaces (4ft x 4ft) each */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((z) => {
            const zoneSpaces = Object.values(storageSpaces).filter((s) => s.zone === `Zone ${z}`);
            const available = zoneSpaces.filter((s) => s.status === "available").length;
            return (
              <div key={z} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-2">
                  <h2 className="text-xl font-bold text-gray-900">Zone {z}</h2>
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-green-600">{available}</span> of 200 available
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <div
                    className="grid gap-1 w-max"
                    style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
                  >
                    {Array.from({ length: 200 }, (_, i) =>
                      renderSpace(`Z${z}-${String(i + 1).padStart(3, "0")}`, true)
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Dialog */}
      {bookingDialogOpen && selectedSpace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Book Storage Space</h3>
                <p className="text-sm text-gray-600 mt-1">Space ID: {selectedSpace.id}</p>
                <p className="text-sm text-gray-600">Zone: {selectedSpace.zone}</p>
              </div>
              <button
                onClick={() => {
                  setBookingDialogOpen(false);
                  setSuccessMessage("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {successMessage ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center">
                <Package className="w-12 h-12 mx-auto mb-2 text-green-600" />
                <p className="font-medium">{successMessage}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.firstName}
                      onChange={(e) => setBookingForm({ ...bookingForm, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.lastName}
                      onChange={(e) => setBookingForm({ ...bookingForm, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building className="w-4 h-4 inline mr-1" />
                    Company
                  </label>
                  <input
                    type="text"
                    value={bookingForm.company}
                    onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.startDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Package className="w-4 h-4 inline mr-1" />
                    Duration
                  </label>
                  <select
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm({ ...bookingForm, duration: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>{getDurationLabel(1)}</option>
                    <option value={3}>{getDurationLabel(3)}</option>
                    <option value={6}>{getDurationLabel(6)}</option>
                    <option value={12}>{getDurationLabel(12)}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${getDurationPrice(bookingForm.duration)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setBookingDialogOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBookSpace}
                    disabled={submitting || !bookingForm.firstName || !bookingForm.lastName || !bookingForm.email}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Reserve Space"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

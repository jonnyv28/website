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

    // R Zones (R1-R22) - each has multiple spaces
    for (let r = 1; r <= 22; r++) {
      for (let s = 1; s <= 10; s++) {
        const id = `R${r}-${s}`;
        spaces[id] = { id, zone: `R${r}`, status: "available" };
      }
    }

    // ZONE S (left side grid)
    const zoneS = ["Z", "O", "N", "E", "S", "G"];
    for (let row = 0; row < zoneS.length; row++) {
      for (let col = 1; col <= 32; col++) {
        const id = `S-${zoneS[row]}${col}`;
        spaces[id] = { id, zone: "ZONE-S", status: "available" };
      }
    }

    // ZONE 1, 2, 3 (main vertical lanes)
    for (let z = 1; z <= 3; z++) {
      for (let lane = 1; lane <= 7; lane++) {
        for (let pos = 1; pos <= 20; pos++) {
          const id = `Z${z}-L${lane}-${pos}`;
          spaces[id] = { id, zone: `ZONE-${z}`, status: "available" };
        }
      }
    }

    // ZONE 4 (bottom right)
    const zone4 = ["Z", "O", "N", "E"];
    for (let row = 0; row < zone4.length; row++) {
      for (let col = 1; col <= 14; col++) {
        const id = `4-${zone4[row]}${col}`;
        spaces[id] = { id, zone: "ZONE-4", status: "available" };
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
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Warehouse Storage Management</h1>
          <p className="text-gray-600">Click on any available (green) space to book it</p>

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

        {/* Warehouse Layout */}
        <div className="bg-white rounded-lg shadow-lg p-8 overflow-x-auto">
          <div className="min-w-[1600px]">
            {/* R Zones Header (R1-R22) */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 22 }, (_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-xs font-bold mb-2 w-20 text-center border-b-2 border-gray-300 pb-1">
                    R{i + 1}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {Array.from({ length: 10 }, (_, s) => renderSpace(`R${i + 1}-${s + 1}`, true))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-8">
              {/* Left Section - ZONE S */}
              <div className="flex flex-col gap-8">
                {/* ZONE S Upper Grid */}
                <div className="border-2 border-gray-400 p-4">
                  <div className="flex gap-0.5">
                    <div className="flex flex-col gap-0.5">
                      {["Z", "O", "N", "E", "S", "G"].map((letter, idx) => (
                        <div key={idx} className="flex items-center justify-center w-8 h-8 font-bold text-sm">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-rows-6 gap-0.5">
                      {["Z", "O", "N", "E", "S", "G"].map((letter, row) => (
                        <div key={row} className="flex gap-0.5">
                          {Array.from({ length: 22 }, (_, col) => renderSpace(`S-${letter}${col + 1}`, true))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ZONE S Lower Grid */}
                <div className="border-2 border-gray-400 p-4">
                  <div className="flex gap-0.5">
                    <div className="flex flex-col gap-0.5">
                      {["Z", "O", "N", "E", "S", "G"].map((letter, idx) => (
                        <div key={idx} className="flex items-center justify-center w-8 h-8 font-bold text-sm">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-rows-6 gap-0.5">
                      {["Z", "O", "N", "E", "S", "G"].map((letter, row) => (
                        <div key={row} className="flex gap-0.5">
                          {Array.from({ length: 10 }, (_, col) => renderSpace(`S-${letter}${col + 23}`, true))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Office and Restroom */}
                <div className="flex flex-col gap-2">
                  <div className="border-2 border-gray-800 bg-blue-50 p-4 text-center font-bold">
                    RESTROOM
                  </div>
                  <div className="border-2 border-gray-800 bg-blue-50 p-4 text-center font-bold">
                    OFFICE
                  </div>
                </div>
              </div>

              {/* Main Storage Zones 1, 2, 3 */}
              <div className="flex gap-8 flex-1">
                {[1, 2, 3].map((zoneNum) => (
                  <div key={zoneNum} className="flex-1 border-2 border-gray-400 p-4">
                    <div className="text-center font-bold mb-4 text-lg border-b-2 border-gray-300 pb-2">
                      ZONE {zoneNum}
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 7 }, (_, lane) => (
                        <div key={lane} className="flex flex-col gap-0.5">
                          {Array.from({ length: 20 }, (_, pos) => renderSpace(`Z${zoneNum}-L${lane + 1}-${pos + 1}`, true))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Section - ZONE 4 */}
              <div className="flex flex-col justify-center">
                <div className="border-2 border-gray-400 p-4">
                  <div className="flex gap-0.5">
                    <div className="flex flex-col gap-0.5">
                      {["Z", "O", "N", "E"].map((letter, idx) => (
                        <div key={idx} className="flex items-center justify-center w-8 h-8 font-bold text-sm">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-rows-4 gap-0.5">
                      {["Z", "O", "N", "E"].map((letter, row) => (
                        <div key={row} className="flex gap-0.5">
                          {Array.from({ length: 14 }, (_, col) => renderSpace(`4-${letter}${col + 1}`, true))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center font-bold mt-2 text-sm">ZONE 4</div>
                </div>
              </div>
            </div>

            {/* Loading Docks */}
            <div className="flex justify-center gap-32 mt-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-32 border-4 border-gray-600 bg-gray-200 rounded-t-lg"></div>
                <div className="text-sm font-bold mt-2">DOCK 1</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-32 border-4 border-gray-600 bg-gray-200 rounded-t-lg"></div>
                <div className="text-sm font-bold mt-2">DOCK 2</div>
              </div>
            </div>
          </div>
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

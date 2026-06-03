"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  Package,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react";

type Booking = {
  id: string;
  spaceId: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  phone: string | null;
  serviceType: string;
  startDate: string;
  endDate: string;
  duration: number;
  laneCount: number;
  pricePerMonth: number;
  totalPrice: number;
  status: string;
  notes: string | null;
  createdAt: string;
};

type CalendarDay = {
  date: Date;
  bookings: Booking[];
  isCurrentMonth: boolean;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        if (selectedBooking?.id === id) {
          setSelectedBooking({ ...selectedBooking, status });
        }
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setBookings(bookings.filter(b => b.id !== id));
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const filteredBookings = activeTab === "all"
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  // Statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    revenue: bookings
      .filter(b => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };

  // Calendar logic
  const getCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayBookings = bookings.filter(b => {
        const bookingStart = new Date(b.startDate);
        const bookingEnd = new Date(b.endDate);
        return current >= bookingStart && current <= bookingEnd;
      });

      days.push({
        date: new Date(current),
        bookings: dayBookings,
        isCurrentMonth: current.getMonth() === month,
      });
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
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
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Admin Dashboard</span>
              <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              List View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "calendar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Calendar View
            </button>
          </div>

          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {viewMode === "list" ? (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { key: "all", label: "All", count: bookings.length },
                { key: "pending", label: "Pending", count: stats.pending },
                { key: "confirmed", label: "Confirmed", count: stats.confirmed },
                { key: "cancelled", label: "Cancelled", count: bookings.filter(b => b.status === "cancelled").length },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-500">Loading...</div>
              ) : filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No bookings found</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Space</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{booking.firstName} {booking.lastName}</p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{booking.spaceId}</td>
                        <td className="px-6 py-4 text-gray-700 capitalize">{booking.serviceType}</td>
                        <td className="px-6 py-4 text-gray-700">
                          {new Date(booking.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">${booking.totalPrice}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          /* Calendar View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`bg-white p-2 min-h-[100px] ${
                    !day.isCurrentMonth ? "bg-gray-50" : ""
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
                  }`}>
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {day.bookings.slice(0, 2).map((booking, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedBooking(booking)}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${getStatusColor(booking.status)}`}
                      >
                        {booking.spaceId}
                      </div>
                    ))}
                    {day.bookings.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{day.bookings.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedBooking.company || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedBooking.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Space ID</p>
                    <p className="font-medium">{selectedBooking.spaceId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-medium capitalize">{selectedBooking.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{new Date(selectedBooking.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{new Date(selectedBooking.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{selectedBooking.duration} month(s)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-medium text-blue-600">${selectedBooking.totalPrice}</p>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium">{selectedBooking.notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                      disabled={selectedBooking.status === "confirmed"}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Confirm
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                      disabled={selectedBooking.status === "cancelled"}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4 inline mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, "completed")}
                      disabled={selectedBooking.status === "completed"}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

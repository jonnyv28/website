"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Truck,
  Package,
  Box,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type ServiceInfo } from "@/lib/services";

// Map the icon key from the service data to the actual icon component.
const ICONS: Record<string, LucideIcon> = {
  ShoppingCart,
  Truck,
  Package,
  Box,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Package;
  return <Icon className={className} />;
}

export function ServicesSection({ showHeader = true }: { showHeader?: boolean }) {
  const [selected, setSelected] = useState<ServiceInfo | null>(null);

  // Let the visitor close the popup with the Escape key.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-4">
              JV LOGISTICS GROUP SERVICES
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional 3PL Solutions</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive logistics services tailored to your business needs. Click any service to
              learn more and book it.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const featured = Boolean(service.highlight);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelected(service)}
                className={`group relative text-left rounded-2xl p-8 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  featured
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white transform hover:-translate-y-1"
                    : "bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-300"
                }`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${
                    featured ? "bg-white opacity-10" : "bg-blue-600 opacity-5"
                  }`}
                ></div>
                <div className="relative flex flex-col h-full">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                      featured ? "bg-white" : "bg-blue-600"
                    }`}
                  >
                    <ServiceIcon
                      name={service.icon}
                      className={`w-7 h-7 ${featured ? "text-blue-600" : "text-white"}`}
                    />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${featured ? "" : "text-gray-900"}`}>
                    {service.name}
                  </h3>
                  <p className={`mb-6 ${featured ? "text-blue-50" : "text-gray-600"}`}>
                    {service.tagline}
                  </p>

                  <div className="mt-auto space-y-2">
                    {service.pricing.slice(0, 2).map((row) => (
                      <div
                        key={row.label}
                        className={`flex justify-between items-center text-sm pb-2 border-b ${
                          featured ? "border-blue-400" : "border-gray-200"
                        }`}
                      >
                        <span className={featured ? "text-blue-50" : "text-gray-700"}>
                          {row.label}
                        </span>
                        <span className="font-bold">{row.value}</span>
                      </div>
                    ))}

                    <span
                      className={`mt-4 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-semibold transition ${
                        featured
                          ? "bg-white text-blue-600 group-hover:bg-blue-50"
                          : "bg-blue-600 text-white group-hover:bg-blue-700"
                      }`}
                    >
                      Learn More &amp; Book
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popup / modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
              <ServiceIcon name={selected.icon} className="w-7 h-7 text-white" />
            </div>

            <h3 id="service-modal-title" className="text-2xl font-bold text-gray-900 mb-3">
              {selected.name}
            </h3>
            <p className="text-gray-600 mb-6">{selected.description}</p>

            {selected.highlight && (
              <div className="mb-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm">
                {selected.highlight}
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-5 mb-8">
              <h4 className="font-bold text-gray-900 mb-3">Pricing</h4>
              <div className="space-y-2">
                {selected.pricing.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center text-gray-700 pb-2 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <span>{row.label}</span>
                    <span className="font-bold text-blue-600">{row.value}</span>
                  </div>
                ))}
              </div>
              {selected.priceModel === "quote" && (
                <p className="text-xs text-gray-500 mt-3">
                  Final pricing is confirmed by email after you submit your request.
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/booking?service=${selected.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Book This Service
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

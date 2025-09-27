// src/app/layout.tsx
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata = {
  title: "Car Detailing Booking",
  description: "Book your car detailing services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Charlie's Detailing
                  </h1>
                  <nav className="space-x-4">
                    <a href="/" className="text-gray-600 hover:text-gray-900">
                      Home
                    </a>
                    <a
                      href="/users"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Users
                    </a>
                    <a
                      href="/cars"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cars
                    </a>
                    <a
                      href="/services"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Services
                    </a>
                    <a
                      href="/bookings"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Bookings
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

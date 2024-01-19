import React from 'react';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-800">
            My Family Website
          </Link>
          <Link href="/chart" className="text-gray-600 hover:text-gray-800">
            View Family Chart
          </Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* Your main content goes here */}
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2024 My Family Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

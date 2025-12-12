import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ADCCI Smart Digital Services Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Abu Dhabi Chamber of Commerce and Industry's comprehensive digital transformation initiative
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            A unified online platform integrating all ADCCI services, featuring AI-powered capabilities, 
            multilingual support, and seamless integration with government and third-party services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded">
              <strong>39 Services</strong>
              <p className="text-gray-600">14 Internal, 19 TAMM, 6 Affiliate</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <strong>3 Membership Tiers</strong>
              <p className="text-gray-600">Basic, Premium, Premium Plus</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <strong>Bilingual Support</strong>
              <p className="text-gray-600">Arabic & English with RTL</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Website Landing Page</h3>
              <p className="text-blue-100">Public-facing portal</p>
            </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Service discovery & information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Responsive design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Enhanced from prototype</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Dynamic content display</span>
                </li>
              </ul>
              <Link 
                href="/website-demo"
                className="block w-full bg-blue-500 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Website Demo
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Unified Portal</h3>
              <p className="text-green-100">Member dashboard (Priority)</p>
            </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Personalized dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Service management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">AI-powered assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Payment processing</span>
                </li>
              </ul>
              <Link 
                href="/unified-portal"
                className="block w-full bg-green-500 text-white text-center py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Access Unified Portal
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Admin Portal</h3>
              <p className="text-purple-100">Staff management system</p>
            </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Service management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Analytics & reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Member management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">System monitoring</span>
                </li>
              </ul>
              <Link 
                href="/admin-portal"
                className="block w-full bg-purple-500 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Open Admin Portal
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="font-semibold">AI-Powered</h4>
              <p className="text-sm text-gray-600">Smart search, chatbot, recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="font-semibold">Multilingual</h4>
              <p className="text-sm text-gray-600">Arabic & English with RTL support</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="font-semibold">Integrated</h4>
              <p className="text-sm text-gray-600">CRM, ERP, TAMM, affiliates</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold">Cross-Platform</h4>
              <p className="text-sm text-gray-600">Web, iOS, Android native apps</p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p>Reference: Kareem's Prototype | RFP Specification Document</p>
          <Link href="http://localhost:3000" className="text-blue-500 hover:underline">
            View Original Prototype ↗
          </Link>
        </footer>
      </div>
    </main>
  )
}
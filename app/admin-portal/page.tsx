export default function AdminPortal() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Portal Demo</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-4">
            Staff interface for managing services, analytics, and member administration.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <p className="font-semibold">Staff Management System</p>
            <p className="text-sm text-gray-600">Service management, analytics, reporting, and monitoring</p>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from "react";

export default function A03CreateCustomer() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    tel: "",
    brand: "",
    plate: "",
    email: "",
    package_payment_id: "",
  });
  
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch packages on mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:3000/A03CreateCustomer/packages");
      const data = await response.json();
      
      if (data.success) {
        setPackages(data.data);
      } else {
        setError("Failed to load packages");
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Network error loading packages");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      tel: "",
      brand: "",
      plate: "",
      email: "",
      package_payment_id: "",
    });
    setSelectedPackage(null);
    setError("");
    setSuccess("");
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // Handle package selection
  const handlePackageChange = (e) => {
    const packageId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      package_payment_id: packageId,
    }));
    
    const selected = packages.find(
      (pkg) => pkg.package_payment_id === parseInt(packageId)
    );
    setSelectedPackage(selected || null);
    setError("");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!formData.tel.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!/^\d{9,10}$/.test(formData.tel.trim())) {
      setError("Please enter a valid phone number (9-10 digits)");
      return;
    }

    if (!formData.package_payment_id) {
      setError("Please select a payment package");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        tel: parseInt(formData.tel.trim()),
        brand: formData.brand.trim() || null,
        plate: formData.plate.trim() || null,
        email: formData.email.trim() || null,
        package_payment_id: parseInt(formData.package_payment_id),
      };

      const response = await fetch(
        "http://localhost:3000/A03CreateCustomer/create-customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          `Customer created successfully! Customer ID: ${data.customer_id}`
        );
        resetForm();
      } else {
        setError(data.message || "Error creating customer");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl p-6 bg-white shadow rounded-md">
        <p className="text-gray-500">Loading packages...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create New Customer</h2>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-3">Personal Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="0812345678"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@example.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-3">Vehicle Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g., Honda, Yamaha"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Plate
              </label>
              <input
                type="text"
                name="plate"
                value={formData.plate}
                onChange={handleChange}
                placeholder="e.g., ABC-1234"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Package Selection */}
        <div>
          <h3 className="text-lg font-medium mb-3">Payment Package</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Package *
            </label>
            <select
              name="package_payment_id"
              value={formData.package_payment_id}
              onChange={handlePackageChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a package --</option>
              {packages.map((pkg) => (
                <option key={pkg.package_payment_id} value={pkg.package_payment_id}>
                  {pkg.package_name} - ฿{pkg.total_amount.toLocaleString()} 
                  ({pkg.installment_month} months @ ฿{pkg.installment_price.toLocaleString()}/month)
                </option>
              ))}
            </select>
          </div>

          {/* Package Details */}
          {selectedPackage && (
            <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-semibold text-sm mb-2">Package Details:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="ml-2 font-medium">
                    ฿{selectedPackage.total_amount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Installment Period:</span>
                  <span className="ml-2 font-medium">
                    {selectedPackage.installment_month} months
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="ml-2 font-medium">
                    ฿{selectedPackage.installment_price.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">First Due Date:</span>
                  <span className="ml-2 font-medium">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 active:scale-[.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating Customer..." : "Create Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}
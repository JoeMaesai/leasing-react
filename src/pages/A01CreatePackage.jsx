import { useState } from "react";

export default function A01CreatePackage() {
  const [formData, setFormData] = useState({
    packageName: "",
    totalAmount: "",
    installmentMonth: "",
    installmentPrice: "",
  });
    // reset form
  const resetForm = () => {
    setFormData({
      packageName: "",
      totalAmount: "",
      installmentMonth: "",
      installmentPrice: "",
    });
  };

  // handle change for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build object for POST
    const payload = {
      packageName: formData.packageName,
      totalAmount: Number(formData.totalAmount),
      installmentMonth: Number(formData.installmentMonth),
      installmentPrice: Number(formData.installmentPrice),
    };

    console.log("Payload ready for POST:", payload);

    // Example POST (uncomment and replace URL if needed)

    fetch("http://localhost:3000/A01CreatePackage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Server response:", data);
        // ✅ Alert user
        alert("Package saved successfully!");

        // ✅ Reset form
        resetForm();
      })
      .catch(err => console.error("Error:", err));

  };

  return (
    <div className="max-w-md p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create Package</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Package Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Name
          </label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            placeholder="Enter package name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Amount
          </label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Installment Months */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Installment Months
          </label>
          <input
            type="number"
            name="installmentMonth"
            value={formData.installmentMonth}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Installment Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Installment Price
          </label>
          <input
            type="number"
            name="installmentPrice"
            value={formData.installmentPrice}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 active:scale-[.98] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

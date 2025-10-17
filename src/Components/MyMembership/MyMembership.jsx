import axios from 'axios';
import React, { useEffect, useState } from 'react';


// Sub-component for individual info cards
const InfoCard = ({ title, value, isHighlighted = false }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
        <p className={`text-lg font-medium ${isHighlighted ? 'text-indigo-600 font-bold' : ''}`}>{value}</p>
    </div>
);

// Sub-component for invoice history rows
const InvoiceRow = ({ date, packageName, amount }) => (
    <tr>
        <td className="px-6 py-4 whitespace-nowrap">{date}</td>
        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">{packageName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{amount}</td>
        <td className="px-6 py-4 whitespace-nowrap">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Download</a>
        </td>
    </tr>
);

export default function App() {
    // Data for the invoice history can be managed with state or props in a real app
    const invoiceHistory = [
        { id: 1, date: "Oct 15, 2025", package: "Standard (1 Year)", amount: "$80.00" },
        { id: 2, date: "Oct 15, 2024", package: "Standard (1 Year)", amount: "$80.00" },
        { id: 3, date: "Oct 15, 2023", package: "Standard (1 Year)", amount: "$80.00" },
    ];
  
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState("");
    const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://tracsdev.apttechsol.com/api/dashboard`,
                    {
                        headers: { Authorization: token },
                    }
                );

                console.log("API response:", response.data);
                setData(response.data.orders.data);
            } catch (error) {
                setMsg("Failed to fetch data.");
                console.error("Error fetching membership data:", error);
            }
        };

        fetchData();
    }, []);
const latestOrder = data.length > 0 
  ? data.reduce((latest, current) => {
      return new Date(current.purchase_date) > new Date(latest.purchase_date)
        ? current
        : latest;
    }, data[0])
  : null;


function formatDate(dateString) {
  if (!dateString) return "";
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Usage:
formatDate("2025-02-27"); // "Feb 27, 2025"


    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Membership</h1>
                </header>

                {/* Current Membership Card */}
                <main>
                    <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
  <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Active Membership</h2>
      <span className="inline-block bg-green-100 text-green-800 text-sm font-medium mt-2 px-3 py-1 rounded-full">
        {latestOrder ? "Active" : "No Active Membership"}
      </span>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <InfoCard 
      title="Package Name" 
      value={latestOrder ? 
        latestOrder.listing_package_id === "2"
          ? "Basic"
          : latestOrder.listing_package_id === "1"
            ? "Trail"
            : latestOrder.listing_package_id === "3"
              ? "Standard"
              : "Unknown"
        : "-"
      } 
      isHighlighted={true} 
    />
    <InfoCard 
      title="Purchase Date" 
      value={latestOrder ? formatDate(latestOrder.purchase_date) : "-"} 
    />
    <InfoCard 
      title="Expires On" 
      value={latestOrder ? formatDate(latestOrder.expired_date) : "-"} 
    />
    <InfoCard 
      title="Price" 
      value={latestOrder ? `$${latestOrder.amount_usd} / year` : "-"} 
    />
  </div>
</section>

                    {/* Invoice and History Details Section */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice & History</h2>
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Package</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map(order => (
                                            <InvoiceRow
                                                key={order.id}
                                                date={formatDate(order.purchase_date)}
                                                packageName={order.listing_package_id === "2"
                                            ? "Basic"
                                            : order.listing_package_id === "1"
                                                ? "Trail"
                                                : order.listing_package_id === "3"
                                                    ? "Standard"
                                                    : "Unknown"}
                                                amount={order.amount_usd}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
          
        </div>
    );
}

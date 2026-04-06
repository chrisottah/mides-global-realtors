import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

export default function ServicesPage() {
  const services = [
    {
      title: "Property Sales",
      description: "Find your dream home or perfect investment property with our expert guidance.",
      items: ["Residential Homes", "Luxury Villas", "Commercial Spaces", "Land/Plots"]
    },
    {
      title: "Property Rentals",
      description: "Flexible rental options across prime locations in Lagos and beyond.",
      items: ["Short-term Rentals", "Long-term Leases", "Corporate Housing", "Apartment Rentals"]
    },
    {
      title: "Property Management",
      description: "Full-service property management to maximize your investment returns.",
      items: ["Tenant Screening", "Rent Collection", "Maintenance", "Property Inspections"]
    },
    {
      title: "Real Estate Consulting",
      description: "Expert advice on property investment, market trends, and opportunities.",
      items: ["Market Analysis", "Investment Strategy", "Property Valuation", "Legal Guidance"]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <h2 className="text-2xl font-bold text-accent mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Property Solutions Section */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Property Solutions We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Residential</h3>
                <p className="text-sm text-gray-600">Flats, Houses, Apartments</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Commercial</h3>
                <p className="text-sm text-gray-600">Offices, Shops, Warehouses</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Industrial</h3>
                <p className="text-sm text-gray-600">Factories, Workshops</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
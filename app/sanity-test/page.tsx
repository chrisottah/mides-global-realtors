'use client';

import { useEffect, useState } from 'react';
import { sanityClient } from '@/lib/sanity/client';

export default function SanityTestPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await sanityClient.fetch('*[_type == "property"]');
        setProperties(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="pt-32 p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
      
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p><strong>Project ID:</strong> {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</p>
        <p><strong>Dataset:</strong> {process.env.NEXT_PUBLIC_SANITY_DATASET}</p>
      </div>

      {loading && <p>Loading properties...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && !error && (
        <>
          <p className="text-green-600 mb-4">✅ Connected successfully! Found {properties.length} properties.</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(properties, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
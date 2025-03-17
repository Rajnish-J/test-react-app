import useSWR from 'swr';

// Define TypeScript interface for API response
interface IPData {
  query: string; // IP Address
  timezone: string;
  city: string;
  country: string;
}

// Fetcher function
const fetcher = async (url: string): Promise<IPData> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

export default function IPBasedTime() {
  const { data, error } = useSWR<IPData>('http://ip-api.com/json/', fetcher, {
    refreshInterval: 2000, // Refresh every 5 seconds
  });

  if (error) {
    console.error('Error fetching data:', error);
    return <h2>Error loading data. Check console for details.</h2>;
  }

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Your IP: {data.query}</h2>
      <h3>Timezone: {data.timezone}</h3>
      <h3>Time: {data.city  }</h3>
      <h4>Location: {data.city}, {data.country}</h4>
    </div>
  );
}

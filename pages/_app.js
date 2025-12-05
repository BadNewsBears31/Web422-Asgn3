import { SWRConfig } from 'swr';
import Layout from '@/components/Layout'; 
import Container from 'react-bootstrap/Container';
import "@/styles/globals.css";
import "@/styles/bootstrap.min.css";

const fetcher = async (...args) => { 
  const response = await fetch(...args); 
  if (!response.ok) { 
  throw new Error(`Request failed with status: ${response.status}`); 
  } 
  return response.json(); 
};

export default function App({ Component, pageProps }) {
  return (
  <SWRConfig value={{ fetcher }}> 
    <Layout> 
      <Component {...pageProps} /> 
    </Layout> 
  </SWRConfig>
  );
}

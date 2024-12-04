'use client'

import { Form } from "../ui/form";
import { APIProvider } from '@vis.gl/react-google-maps';

export default function Page() {
  return (
    <APIProvider
      apiKey={'AIzaSyB6cOrXry62xSQ6TYYv0OekA71mjM4PQrk'}
      onLoad={console.info}
      onError={console.error}
      region="CH"
    >
      <Form />
    </APIProvider>
  );
}

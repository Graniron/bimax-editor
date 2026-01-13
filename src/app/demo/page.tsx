"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);

  const handleBlocking = async () => {
    setLoading(true);
    const response = await fetch('/api/demo/blocking', {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data);
    setLoading(false);
  }

  const handleBackground = async () => {
    setLoading(true);
    const response = await fetch('/api/demo/background', {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data);
    setLoading(false);
  }

  const handleClientError = () => {
    throw new Error('This is a client-side error');
  }

  const handleApiError = async () => {
    await fetch('/api/demo/error', {
      method: 'POST',
    });
  }

  const handleInngestError = async () => {
    await fetch('/api/demo/inngest-error', {
      method: 'POST',
    });
  };

  return (
    <div className="p-8 space-x-4">
      <h1>Demo Page</h1>
      
      <Button onClick={handleBlocking}>
        {loading ? 'Loading...' : 'Blocking'}
        </Button>

        <Button onClick={handleBackground}>
        {loading ? 'Loading...' : 'Background'}
        </Button>

        <Button onClick={handleClientError}>
        Client Error
        </Button>

        <Button onClick={handleApiError}>
        API Error
        </Button>

        <Button onClick={handleInngestError}>
          Inngest Error
        </Button>
    </div>
  )
}
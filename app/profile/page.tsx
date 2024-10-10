"use client";

import { useState, useEffect } from "react";
import { getUser, logout } from "@/hooks/auth";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      setLoading(true);
      const data = await getUser();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Skeleton />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <p className="text-gray-700">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 animate-pulse">
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-4">
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

import { HomePage } from "@/components/home-page";
import { LoginPage } from "@/components/login-page";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

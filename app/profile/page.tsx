"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/hooks/auth";

const Profile = () => {
  return (
    <div>
      <Button onClick={() => logout()}>Log out</Button>
    </div>
  );
};

export default Profile;

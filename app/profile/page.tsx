"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/hooks/auth";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div>
      <Button onClick={() => logout()}>Log out</Button>
    </div>
  );
};

export default Profile;

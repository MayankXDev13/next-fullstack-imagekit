"use client";
import { useRouter } from "next/dist/client/components/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();


  

  return <div className="bg-amber-700">Register Page</div>;
}

export default RegisterPage;

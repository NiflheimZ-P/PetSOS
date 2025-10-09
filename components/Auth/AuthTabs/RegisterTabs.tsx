"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterTabs = ({}) => {

  return (
    <TabsContent value="register" className="">
      <form action="" className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="font-bold">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            placeholder="Enter your confirm password"
            required
          />
        </div>
        <Button className="w-full">Register</Button>
      </form>
    </TabsContent>
  );
};
export default RegisterTabs;
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
// import { signIn } from "next-auth/react";
// import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleSignIn from "@/components/Auth/Button/GoogleButton"; 

const LoginTabs = () => {
  return (
    <TabsContent value="login" className="">
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
            name="password"
            type="password"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button className="w-full">Login</Button>
      </form>
      <br />
      <GoogleSignIn
      />
    </TabsContent>
  );
};

export default LoginTabs;
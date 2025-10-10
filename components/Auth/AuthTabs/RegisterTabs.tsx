"use client";
import React, { ChangeEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type RegisterState={
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string
}

type RegisterTabsProps = {
  register:RegisterState;
  handleRegisterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setRegister:React.Dispatch<React.SetStateAction<RegisterState>>;
}

const RegisterTabs = ({register,handleRegisterChange,setRegister}:RegisterTabsProps )=> {
  const router = useRouter();
  const handleRegister = async(e:any)=>{
    e.preventDefault();
    if (register.password.length < 8 && register.confirmPassword.length < 8){
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    if (register.password !== register.confirmPassword){
      toast.error("Passwords do not match!");
      return;
    }
    const data = await fetch("/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(register)
    });
    const res = await data.json();
    if (res.ok){
      toast.success("Registeration successful!");
      setRegister({first_name:"", last_name:"",username:"",email:"",password:"",confirmPassword:""});
    }
    else{
      toast.error(res.message);
    }
    try{
      const result = await signIn("credentials",{
        email: register.email,
        password:register.password,
        redirect: false,
      });
      if (result?.error){
        toast.error(result.error);
      } else {
        router.push("/");
      }
    } catch (error){
      console.error(error);
    }
  }
  return (
    <TabsContent value="register" className="">
      <form action="" className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="first_name" className="font-bold">First name</label>
          <Input
            value={register.first_name}
            onChange={handleRegisterChange}
            id="first_name"
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="last_name" className="font-bold">Last Name</label>
          <Input
            value={register.last_name}
            onChange={handleRegisterChange}
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="username" className="font-bold">Username</label>
          <Input
          value={register.username}
          onChange={handleRegisterChange}
          id="username"
          type="text"
          name="username"
          placeholder="Enter your username"
          required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <Input
            value={register.email}
            onChange={handleRegisterChange}
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
            value={register.password}
            onChange={handleRegisterChange}
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
            value={register.confirmPassword}
            onChange={handleRegisterChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            placeholder="Enter your confirm password"
            required
          />
        </div>
        <Button type="submit" onClick={handleRegister} className="w-full">Register</Button>
      </form>
    </TabsContent>
  );
};
export default RegisterTabs;
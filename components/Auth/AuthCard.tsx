'use client'
import React,{ChangeEvent, useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterTabs from "@/components/Auth/AuthTabs/RegisterTabs";
import LoginTabs from "@/components/Auth/AuthTabs/LoginTabs";

const AuthCard = () => {
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    username:"",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [login, setLogin] = useState({
    email:"",
    password:""
  })
  const handleRegisterChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setRegister({...register, [e.target.name]: e.target.value})
  }
  const handleLoginChange = (e:ChangeEvent<HTMLInputElement>) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }
  return (
    <Card className=" w-full max-w-lg bg-white rounded-[1rem] flex items-center min-h-[540px]">
      <CardHeader className="w-full text-center  ">
        {/* <div className="w-fit bg-[var(--primary-color)] rounded-full p-5 mx-auto ">
        </div> */}
        <div className="space-y-5">
          <CardTitle className="font-extrabold text-4xl text-[#000000]">
            <div className="flex items-center gap-2 justify-center">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_330)">
                  <path
                    clipRule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_330">
                    <rect fill="white" height="48" width="48" />
                  </clipPath>
                </defs>
              </svg>
              Pet SOS
            </div>
          </CardTitle>
          <CardDescription>
            Pet SOS 
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-full max-w-xl flex-col gap-6 ">
        <Tabs className="" defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <LoginTabs login={login} setLogin={setLogin} handleLoginChange={handleLoginChange} />
          <RegisterTabs register={register} setRegister={setRegister} handleRegisterChange={handleRegisterChange} />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthCard;

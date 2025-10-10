import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleSignIn from "@/components/Auth/Button/GoogleButton"; 

type LoginState={
  email:string;
  password:string;
}
type LoginTabsProps = {
  login:LoginState;
  handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setLogin:React.Dispatch<React.SetStateAction<LoginState>>;
}
const LoginTabs = ({login,handleLoginChange}:LoginTabsProps )=> {
  const router = useRouter();
  const check = async(e:any) =>{
    e.preventDefault();
    if (!login.email || !login.password){
      toast.error("Please fill all fields");
      return;
    }
    if(login.password.length < 8){
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try{
      const result = await signIn("credentials",{
        email: login.email,
        password: login.password,
        redirect: false,
      });
      if (result?.error){
        toast.error(result.error);
      }else{
        toast.success("Login successful");
        router.push("/");
      }
    }catch(error){
      toast.error(error as string)
    }
  };
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
            value={login.email}
            onChange={handleLoginChange}
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
            value={login.password}
            onChange={handleLoginChange}
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button className="w-full" onClick={check} >Login</Button>
      </form>
      <br />
      <GoogleSignIn />
    </TabsContent>
  );
};

export default LoginTabs;
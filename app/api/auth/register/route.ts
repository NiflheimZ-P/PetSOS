import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'
export const POST = async (req: any) => {
  try {

    const {first_name, last_name, username, email, password} = await req.json();
    if (!first_name?.trim() || !last_name?.trim() || !username?.trim()  || !email?.trim()  || !password?.trim()){
      return NextResponse.json({status:400, message:"All field are require!"});
    }
    if (await prisma.user.findUnique({where:{email:email}})){
        return NextResponse.json({status:400, message:"Email Already Exist!"});
    }
    if (await prisma.user.findUnique({where:{username:username}})){
        return NextResponse.json({status:400, message:"Username Already Exist!"});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: hashPassword,
        role: "USER",
      },
    });
    return NextResponse.json({status:201, message:"User Created Successfully", user:createUser})
  } catch (error) {
    return NextResponse.json({status:400, error:error})
  };
};

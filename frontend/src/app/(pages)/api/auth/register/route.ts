import { backendBase } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest, res:NextResponse) {
  // TODO: Create a type for req.body
  const reqBody = await req.json();
  const postRegister = await fetch(`${backendBase}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody),
  });

  const resRegister = await postRegister.json();

  return Response.json(resRegister);

};

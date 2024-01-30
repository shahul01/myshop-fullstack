import { backendBase } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server"


export async function POST(req:NextRequest, res:NextResponse) {
  const reqBody = await req.json();

  const postLogin = await fetch(`${backendBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody)
  });

  const resLogin = await postLogin.json();

  // status(postLogin.status)
  return Response.json(resLogin);

};

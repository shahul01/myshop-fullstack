import { backendBase } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server"


export async function POST(req:NextRequest, res:NextResponse) {
  const reqBody = await req.json();

  const postLogin = await fetch(`${backendBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody)
  });

  const authToken = postLogin.headers.get('Authorization');
  const refreshToken = postLogin.headers.get('set-cookie');
  // if (!authToken || !refreshToken) return new Response('Error', {status: 400});

  // has user data
  const resLogin = await postLogin.json();

  // ...resLogin
  const response = NextResponse.json(
    { ...resLogin }, { status: 201 }
  );
  response.headers.set('Authorization', authToken!);
  // sets refresh Token automatically on the client
  response.headers.set('refreshToken', refreshToken!);


  return response;

};

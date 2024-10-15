import { NextRequest, NextResponse } from "next/server";
import { backendBase, tokenName } from "@/app/utils/constants";


export async function GET(req: NextRequest, res: NextResponse) {
  const emailId = req.nextUrl.searchParams.get('email');
  if (!emailId) throw new Error('Email Id cannot be empty.');

  const reqAuth = req.headers.get('Authorization');
  if (!reqAuth) throw new Error('Authorization header cannot be empty.');

  const getUser = await fetch(`${backendBase}/user/${emailId}`, {
    // credentials: "include",
    headers: { 'Authorization': reqAuth }
  });
  const resGetUser = await getUser.json();

  return Response.json({...resGetUser});
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  console.log(`reqBody: `, reqBody);
  const userId = req.nextUrl.searchParams.get('id');
  if (!userId) throw new Error('User Id cannot be empty.');
  const reqAuth = req.headers.get('Authorization');
  if (!reqAuth) throw new Error('Authorization header cannot be empty.');
  // const authToken = req.headers.get(tokenName);
  // const cookies = req.headers.get('cookie');
  // const authTokenCookie = cookies?.split(`${tokenName}=`)?.[1];

  const postDetails = await fetch(`${backendBase}/user/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': reqAuth
    },
    // credentials: 'include',
    body: JSON.stringify(reqBody)
  });

  const resDetails = await postDetails.json();
  console.log(`resDetails: `, resDetails);

  return Response.json({...resDetails});
}

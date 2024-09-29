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

  return Response.json(resGetUser);
}

// WIP
export async function PATCH(req:NextRequest, res:NextResponse) {

  const reqBody = await req.json();
  console.log(`req.headers: `, req.headers);
  const authToken = req.headers.get(tokenName);
  console.log(`authToken: `, authToken);
  const cookies = req.headers.get('cookie');
  const authTokenCookie = cookies?.split(`${tokenName}=`)?.[1];
  console.log(`authTokenCookie: `, authTokenCookie);

  // const userId

  // if (!authToken) return Response.json({message: 'No auth token provided'});
  const postDetails = await fetch(`${backendBase}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', },
    credentials: 'include',
    body: JSON.stringify(reqBody)
  });

  const resDetails = await postDetails.json();

  return Response.json({data: ''});
};

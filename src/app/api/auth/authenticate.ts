// // /src/app/api/auth/authenticate.ts

// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function authenticate(req: NextRequest) {
//   const token = req.headers.get("Authorization")?.split(" ")[1]; // Assuming token is sent in 'Authorization' header

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Decode the token and attach it to the request
//     const decoded = jwt.verify(token, "your_secret_key") as { userId: string };
    
//     // Attach decoded user data to the request
//     (req as NextRequest & { user: { userId: string } }).user = decoded;

//     return null; // Proceed if authentication is successful
//   } catch (error) {
//     return NextResponse.json({ error: "Unauthorized", details: error.message }, { status: 401 });
//   }
// }

// "use client";
// // LoginPage.tsx
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface User {
//   email: string;
//   password: string;
//   name: string;
// }

// const users: User[] = [
//   { email: "kendra@dashboard.com", password: "kendra12345", name: "Kendra" },
//   {
//     email: "kendra123@dashboard.com",
//     password: "kendra12345",
//     name: "Kendra123",
//   },
//   {
//     email: "kendra-user@dashboard.com",
//     password: "kendra12345",
//     name: "Kendra-user",
//   },
// ];

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState("kendra@dashboard.com");
//   const [password, setPassword] = useState("kendra12345");

//   useEffect(() => {
//     // Check if the user is logged in
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn) {
//       window.location.href = "/dashboard"; // Redirect client-side
//     }
//   }, []);

//   const handleLogin = () => {
//     // Find the user with the entered email and password
//     const user = users.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (user) {
//       localStorage.setItem("isLoggedIn", "true");
//       window.location.href = "/dashboard"; // Redirect using browser navigation
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <Card className="w-full max-w-sm p-4">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">
//             Kendra Dashboard
//           </CardTitle>
//           {/* <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription> */}
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="email@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <Button type="button" onClick={handleLogin} className="w-full">
//               Login
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;

// import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import {
//   ChevronLeft,
//   ChevronRight,
//   Copy,
//   CreditCard,
//   File,
//   Home,
//   LayoutDashboard,
//   LineChart,
//   ListFilter,
//   MoreVertical,
//   Package,
//   Package2,
//   PanelLeft,
//   Search,
//   Settings,
//   ShoppingCart,
//   Store,
//   ToggleLeft,
//   Truck,
//   Users2,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination"
// import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { DatePickerDemo } from "./ui/datepicker"
// import { Switch } from "@radix-ui/react-switch"
// import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form"
// import { SwitchForm } from "./formSwitch"
// import { Label } from "./ui/label"
// import { CardWithForm } from "./card"
// import APIButton from "./apicall"
// import CardNoOfQueriesToday from "./apicall"
// import CardNoOfQueries from "./apicall"

// export function DashboardComponent() {

//   const callAPI = async () => {
// 		try {
// 			const res = await fetch(
// 				`https://jsonplaceholder.typicode.com/posts/1`
// 			);
// 			const data = await res.json();
// 			console.log(data);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//         <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
         
//           <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//             <Link
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//               >
//                           <LayoutDashboard className="h-5 w-5" />
//                 <span className="sr-only">Kendra Dashboard</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Kendra Dashboard</TooltipContent>
//           </Tooltip>
//           </TooltipProvider>
//           <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//             <Link
//                 href="/toggle"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//               >
//                 <ToggleLeft className="h-5 w-5" />
//                 <span className="sr-only">Toggle Switch</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Kendra Dashboard</TooltipContent>
//           </Tooltip>
//           </TooltipProvider>
      
//         </nav>
//         <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//               >
//                 <Settings className="h-5 w-5" />
//                 <span className="sr-only">Settings</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Settings</TooltipContent>
//           </Tooltip>
//           </TooltipProvider>
//         </nav>
//       </aside>
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button size="icon" variant="outline" className="sm:hidden">
//                 <PanelLeft className="h-5 w-5" />
//                 <span className="sr-only">Toggle Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="sm:max-w-xs">
//               <nav className="grid gap-6 text-lg font-medium">
//                 <Link
//                   href="#"
//                   className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//                 >
//                   <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//                   <span className="sr-only">Acme Inc</span>
//                 </Link>
//                 <Link
//                   href="/dashboard"
//                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 >
//                   <Home className="h-5 w-5" />
//                   Dashboard
//                 </Link>
             
//                 <Link
//                   href="#"
//                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 >
//                   <LineChart className="h-5 w-5" />
//                   Settings
//                 </Link>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <div className="flex items-center">
//             <h1 className="text-lg font-semibold md:text-2xl">Kendra Dashboard</h1>
//           </div>
//           <div className="relative ml-auto flex-1 md:grow-0">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search..."
//               className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
//             />
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="overflow-hidden rounded-full"
//               >
//                 <a>
//                 <Image
//                   src=""
//                   width={36}
//                   height={36}
//                   alt="Avatar"
//                   className="overflow-hidden rounded-full"
//                 />
//                 </a>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Settings</DropdownMenuItem>

//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
          
//         </header>
//         <div className="ml-6 flex  items-center gap-2">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="h-10 gap-1 text-sm"
//                       >
//                         <ListFilter className="h-3.5 w-3.5" />
//                         <span className="sr-only sm:not-sr-only">Filter</span>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Status</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuCheckboxItem checked>
//                         Status
//                       </DropdownMenuCheckboxItem>
//                       <DropdownMenuCheckboxItem>
//                         Date
//                       </DropdownMenuCheckboxItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//              <DatePickerDemo></DatePickerDemo>
   
//                 </div>
//         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
//           <CardNoOfQueries></CardNoOfQueries>
//               <Card x-chunk="dashboard-05-chunk-1">
//                 <CardHeader className="pb-2">
//                   <CardDescription>This week</CardDescription>
//                   <CardTitle className="text-4xl">1,421</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-xs text-muted-foreground">
//                   No. of queries
//                   </div>
//                 </CardContent>
//                 {/* <CardFooter>
//                   <Progress value={78} aria-label="25% increase" />
//                 </CardFooter> */}
//               </Card>
//               <Card x-chunk="dashboard-05-chunk-1">
//                 <CardHeader className="pb-2">
//                   <CardDescription>This month</CardDescription>
//                   <CardTitle className="text-4xl">4,321</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-xs text-muted-foreground">
//                   No. of queries
//                   </div>
//                 </CardContent>
//                 {/* <CardFooter>
//                   <Progress value={78} aria-label="25% increase" />
//                 </CardFooter> */}
//               </Card>
                
//             <SwitchForm></SwitchForm>
//                 <CardWithForm></CardWithForm>
                

//         </main>
//       </div>
//     </div>
//   )
// }

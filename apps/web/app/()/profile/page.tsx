"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { LogOut, Package, MapPin, User, Mail, Phone, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, isLogin, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLogin) {
            router.push("/login");
        }
    }, [isLogin, router]);

    if (!user) return null;

    // Mock orders
    const orders = [
        {
            id: "ORD-7352",
            date: "Oct 23, 2023",
            status: "Delivered",
            total: "450,000đ",
            items: ["Cute Teddy Bear Amigurumi (x1)"]
        },
        {
            id: "ORD-9211",
            date: "Sep 12, 2023",
            status: "Processing",
            total: "1,200,000đ",
            items: ["Pastel Granny Square Blanket (x1)"]
        },
        {
            id: "ORD-1044",
            date: "Aug 05, 2023",
            status: "Cancelled",
            total: "250,000đ",
            items: ["Boho Crochet Market Bag (x1)"]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Info */}
                <div className="w-full md:w-1/3 space-y-6">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <Avatar className="h-24 w-24 mx-auto mb-4">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-muted-foreground text-sm">{user.email}</p>

                            <Button variant="outline" className="w-full mt-6 gap-2 text-destructive hover:text-destructive" onClick={logout}>
                                <LogOut className="h-4 w-4" />
                                Log out
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{user.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{user.email}</span>
                            </div>
                            {user.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.phone}</span>
                                </div>
                            )}
                            {user.address && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.address}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-6">My Account</h1>

                    <Tabs defaultValue="orders" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6">
                            <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Order History</TabsTrigger>
                            <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="orders" className="space-y-4">
                            {orders.map(order => (
                                <Card key={order.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Package className="h-5 w-5 text-primary" />
                                                <span className="font-semibold text-lg">{order.id}</span>
                                            </div>
                                            {order.status === "Delivered" && <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>}
                                            {order.status === "Processing" && <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">Processing</Badge>}
                                            {order.status === "Cancelled" && <Badge variant="destructive" className="text-white">Cancelled</Badge>}
                                        </div>
                                        <CardDescription className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {order.date}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-muted-foreground">
                                                {order.items.join(", ")}
                                            </div>
                                            <div className="font-bold">
                                                {order.total}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground">Account settings functionality would go here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

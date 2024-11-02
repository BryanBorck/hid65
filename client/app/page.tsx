"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Calendar,
  Download,
  AlertTriangle,
  Zap,
  DollarSign,
  Activity,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Simulated real-time data - In a real app, this would come from an API
const consumptionData = [
  { hour: "00:00", watts: 2400 },
  { hour: "02:00", watts: 1398 },
  { hour: "04:00", watts: 9800 },
  { hour: "06:00", watts: 3908 },
  { hour: "08:00", watts: 4800 },
  { hour: "10:00", watts: 3800 },
  { hour: "12:00", watts: 4300 },
  { hour: "14:00", watts: 5300 },
  { hour: "16:00", watts: 6300 },
  { hour: "18:00", watts: 7300 },
  { hour: "20:00", watts: 4300 },
  { hour: "22:00", watts: 3300 },
];

const notifications = [
  {
    id: 1,
    title: "Power Surge Detected",
    description:
      "Unusual spike in power consumption detected in Kitchen circuit.",
    timestamp: "2 minutes ago",
    severity: "high",
  },
  {
    id: 2,
    title: "High Consumption Pattern",
    description: "Energy usage is 40% higher than your daily average.",
    timestamp: "15 minutes ago",
    severity: "medium",
  },
  {
    id: 3,
    title: "Off-Peak Hours Starting",
    description:
      "Lower electricity rates will be in effect for the next 6 hours.",
    timestamp: "1 hour ago",
    severity: "low",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 py-4 px-8 pt-6 mt-20">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 24 Hours
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
          <TabsTrigger value="reports">Reports</TabsTrigger>
          {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Power Usage
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,450W</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cost per Hour
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.42</div>
                <p className="text-xs text-muted-foreground">
                  Based on current usage
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Daily Total
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2 kWh</div>
                <p className="text-xs text-muted-foreground">
                  +15% vs. yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Power Quality
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Fair</div>
                <p className="text-xs text-muted-foreground">2 alerts active</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Consumption Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={consumptionData}>
                    <XAxis
                      dataKey="hour"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}W`}
                    />
                    <Bar
                      dataKey="watts"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Alert
                      key={notification.id}
                      variant={
                        notification.severity === "high"
                          ? "destructive"
                          : notification.severity === "medium"
                          ? "default"
                          : null
                      }
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="flex items-center justify-between">
                        {notification.title}
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        {notification.description}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

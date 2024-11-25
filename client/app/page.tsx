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
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

interface DataProps {
  realPower: number[];
  apparentPower: number[];
  vrms: number[];
  irms: number[];
  powerFactor: number[];
}

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
  const [data, setData] = useState<DataProps>({
    realPower: [],
    apparentPower: [],
    vrms: [],
    irms: [],
    powerFactor: [],
  });

  const fetchData = async () => {
    const response = await fetch("/api/get-data", {
      method: "POST",
    });
    const result = await response.json();
    setData(result);
    console.log("Data from Arduino", result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const realPowerChartData = data.realPower.map(
    (value: number, index: number) => ({
      hour: `Hour ${index + 1}`,
      watts: value,
    })
  );

  const apparentPowerChartData = data.apparentPower.map(
    (value: number, index: number) => ({
      hour: `Hour ${index + 1}`,
      watts: value,
    })
  );

  const vrmsChartData = data.vrms.map((value: number, index: number) => ({
    hour: `Hour ${index + 1}`,
    watts: value,
  }));

  const irmsChartData = data.irms.map((value: number, index: number) => ({
    hour: `Hour ${index + 1}`,
    watts: value,
  }));

  const powerFactorChartData = data.powerFactor.map(
    (value: number, index: number) => ({
      hour: `Hour ${index + 1}`,
      watts: value,
    })
  );

  const handleDownload = () => {
    // Trigger the file download
    const fileUrl = "/data/mock.txt"; // Path to the file in the public folder
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "mock.txt"; // Name of the file for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 space-y-4 py-4 px-8 pt-6 mt-20 pb-36">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 24 Hours
          </Button>
          <Button onClick={handleDownload}>
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
                <CardTitle>Real Power Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={realPowerChartData}>
                    <XAxis
                      dataKey="s"
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
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="">
              <CardHeader>
                <CardTitle>Real Power Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={realPowerChartData}>
                    <XAxis
                      dataKey="s"
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
            <Card className="">
              <CardHeader>
                <CardTitle>Apparent Power Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={apparentPowerChartData}>
                    <XAxis
                      dataKey="s"
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
                      className="fill-gray-500"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Voltage Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={vrmsChartData}>
                    <XAxis
                      dataKey="s"
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
                    <Line
                      type="monotone"
                      color="red"
                      dataKey="watts"
                      stroke="currentColor"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Current Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={irmsChartData}>
                    <XAxis
                      dataKey="s"
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
                    <Line
                      type="monotone"
                      color="cyan"
                      dataKey="watts"
                      stroke="currentColor"
                      strokeWidth={2}
                      dot={false}
                      className="stroke-gray-500"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Power Factor Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={powerFactorChartData}>
                    <XAxis
                      dataKey="s"
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
                    <Line
                      type="monotone"
                      dataKey="watts"
                      stroke="currentColor"
                      strokeWidth={2}
                      dot={false}
                      className="stroke-gray-500"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

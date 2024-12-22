import { TrendingUp, RefreshCw } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "@/components/ui/button"
import useSWR from "swr"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartConfig = {
    incoming: {
        label: "Incoming",
        color: "var(--chart-8)",
    },
    outgoing: {
        label: "Outgoing",
        color: "var(--chart-4)",
    },
}

function ChartArea() {
    const { data: transactions, mutate: mutateTransactions } = useSWR("/api/transactions/weekly");
    const handleRefresh = () => {
        mutateTransactions();
    };

    return (
            <Card className="h-full flex flex-col justify-between relative">
                <Button
                    className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                    color="primary"
                    onClick={handleRefresh}
                >
                    <RefreshCw color="#FFFFFF" />
                </Button>
                <CardHeader  className="items-center pb-0">
                    <CardTitle>Weekly Transaction</CardTitle>
                    <CardDescription>
                        Showing weekly transactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={transactions}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <defs>
                                <linearGradient id="fillIncoming" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-incoming)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-incoming)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillOutgoing" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-outgoing)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-outgoing)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="incoming"
                                type="natural"
                                fill="url(#fillIncoming)"
                                fillOpacity={0.4}
                                stroke="var(--color-incoming)"
                                stackId="a"
                            />
                            <Area
                                dataKey="outgoing"
                                type="natural"
                                fill="url(#fillOutgoing)"
                                fillOpacity={0.4}
                                stroke="var(--color-outgoing)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            {/* <div className="flex items-center gap-2 font-medium leading-none">
                                Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
                            </div> */}
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                Weekly Transactions
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
    )
}

export { ChartArea };
import * as React from "react"
import { TrendingUp, RefreshCw } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { Button } from "@/components/ui/button"

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

const dataStockDistribution = [
    { name: "Motif Parang", stock: 350, fill: "var(--color-parang)" },
    { name: "Motif Kawung", stock: 250, fill: "var(--color-kawung)" },
    { name: "Motif Mega Mendung", stock: 150, fill: "var(--color-megamendung)" },
    { name: "Motif Sekar Jagad", stock: 100, fill: "var(--color-sekarjagad" },
    { name: "Motif Lainnya", stock: 400, fill: "var(--color-other)" },
];

const chartConfig = {
    parang: {
        label: "MotifParang",
        color: "hsl(var(--chart-1))",
    },
    kawung: {
        label: "MotifKawung",
        color: "hsl(var(--chart-2))",
    },
    megamendung: {
        label: "MotifMega Mendung",
        color: "hsl(var(--chart-3))",
    },
    sekarjagad: {
        label: "MotifSekar Jagad",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "MotifLainnya",
        color: "hsl(var(--chart-5))",
    },
}

export function ChartPie() {
    const totalStock = React.useMemo(() => {
        return dataStockDistribution.reduce((acc, curr) => acc + curr.stock, 0)
    }, [])

    return (
        <Card className="flex flex-col h-full relative">
            <Button
                className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                color="primary"
            >
                <RefreshCw color="#FFFFFF" />
            </Button>
            <CardHeader className="items-center pb-0">
                <CardTitle>Batik Stock Distribution</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={dataStockDistribution}
                            dataKey="stock"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalStock.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Stock
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total stock for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
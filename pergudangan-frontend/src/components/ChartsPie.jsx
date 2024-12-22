import { RefreshCw } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import useSWR from "swr";

const chartConfig = {
    1: {
        color: "var(--chart-1)",
    },
    2: {
        color: "var(--chart-2)",
    },
    3: {
        color: "var(--chart-3)",
    },
    4: {
        color: "var(--chart-4)",
    },
    5: {
        color: "var(--chart-5)",
    },
    other: {
        color: "var(--chart-other))",
    },
};

function AddFillToData(data) {
    for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
            data[i].fill = `var(--chart-other)`;
            break;
        }
        data[i].fill = `var(--chart-${i + 1})`;
    }
}

function ChartPie() {
    const { data: totalStock, mutate: mutateTotalStock } = useSWR(`/api/batik/total-stock`);
    const { data: stockDistribution, mutate: mutateStockDistribution } = useSWR(`/api/batik/top`);

    AddFillToData(stockDistribution);
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const handleRefresh = () => {
        mutateTotalStock();
        mutateStockDistribution();
    };

    return (
        <Card className="h-full flex flex-col items-center justify-between relative">
            <Button
                className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                color="primary"
                onClick={handleRefresh}
            >
                <RefreshCw color="#FFFFFF" />
            </Button>
            <CardHeader className="items-center pb-0">
                <CardTitle>Batik Stock Distribution</CardTitle>
                <CardDescription>{currentDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square min-w-[250px] min-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={stockDistribution}
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
                                                    {totalStock.total_stock}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Stock
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing total stock distribution on this day
                </div>
            </CardFooter>
        </Card>
    );
}

export { ChartPie };
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { RefreshCw } from "lucide-react";
import { ChartArea } from "@/components/ChartsArea";
import { ChartPie } from "@components/ChartsPie";
import { DataTableBatik, DataTableTransaction } from "@/components/MyDataTables";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';
import { useEffect } from "react";
import { Suspense } from "react";
import { SkeletonChartPie, SkeletonChartArea, SkeletonTable } from "@skeleton/MySkeleton";
import useSWR from "swr";

const KpiCard = ({ label, data }) => {
    return (
        <Card className="flex flex-col items-center justify-center text-center">
            <CardHeader>
                <Label>{label}</Label>
            </CardHeader>
            <CardContent>
                <p>{data}</p>
            </CardContent>
        </Card>
    );
};

const CardStatistic = () => {
    const { data: transactionToday } = useSWR("/api/transactions/today");
    const { data: mostActiveDistributor } = useSWR("/api/distributors/most-active");
    const { data: mostActiveSupplier } = useSWR("/api/suppliers/most-active");
    const { data: mostMotif } = useSWR("/api/batik/most-stock");
    const tagClass = 'inline-block bg-zinc-700 text-white text-xs px-2 rounded-md font-mono uppercase font-bold'
    
    const transactionTodayMessage = (
        <span>There are<span className={tagClass}>{transactionToday?.transaction}</span> trannsactions today</span>
    );
    const mostActiveDistributorMessage = (
        <span><span className={tagClass}>{mostActiveDistributor?.name}</span> <br /> (<span className={tagClass}>{mostActiveDistributor?.transaction}</span> transaction)</span>
    );
    const mostActiveSupplierMessage = (
        <span><span className={tagClass}>{mostActiveSupplier?.name}</span> <br /> (<span className={tagClass}>{mostActiveSupplier?.transaction}</span> transaction)</span>
    );
    const mostMotifMessage = (
        <span><span className={tagClass}>{mostMotif?.name}</span> <br /> (<span className={tagClass}>{mostMotif?.total_stock}</span> pcs)</span>
    );

    return (
        <Card className="h-full flex flex-col justify-around relative">
            <CardHeader>
                <CardTitle>Some Recent Fact</CardTitle>
                <CardDescription>Showing 4 recent fact about your storage</CardDescription>
            </CardHeader>
            <Button
                className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                color="primary"
            >
                <RefreshCw color="#FFFFFF" />
            </Button>
            <CardContent className="grid grid-cols-2 gap-4">
                <KpiCard label="Today's Transactions" data={transactionTodayMessage} />
                <KpiCard label="Most Motifs" data={mostMotifMessage} />
                <KpiCard label="Most Active Distributor" data={mostActiveDistributorMessage} />
                <KpiCard label="Most Active Supplier" data={mostActiveSupplierMessage} />
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
};

function Item() {
    const urlHere = '/dashboard';
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);
    return (
        <>
            <MyBreadCrumb
                items={[{ type: "page", path: urlHere, label: "Dashboard" }]}
            />
            <div className="m-8 flex flex-col gap-8">
                <div className="flex-1 flex flex-col cs:flex-row gap-4 flex-wrap">
                    <div className="flex-1 min-w-80">
                        <Suspense fallback={<SkeletonChartArea />}>
                            <CardStatistic />
                        </Suspense>
                    </div>
                    <div className="flex-1 min-w-80">
                        <Suspense fallback={<SkeletonChartArea />}>
                            <ChartArea />
                        </Suspense>
                    </div>
                    <div className="flex-1">
                        <Suspense fallback={<SkeletonChartPie />}>
                            <ChartPie />
                        </Suspense>
                    </div>
                </div>
                <div className="grid grid-cols-1 cs:grid-cols-2 gap-6">
                    <div className="my-4">
                        <Suspense fallback={<SkeletonTable loopCol={4} className="h-full w-full" />}>
                            <DataTableBatik className="w-full" />
                        </Suspense>
                    </div>
                    <div className="my-4">
                        <Suspense fallback={<SkeletonTable loopCol={4} className="h-full w-full" />}>
                            <DataTableTransaction className="w-full" />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;
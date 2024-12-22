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

    const transactionTodayMessage = `Ada ${transactionToday?.transaction} transaksi hari ini`;
    const mostActiveDistributorMessage = `${mostActiveDistributor?.name} (${mostActiveDistributor?.transaction} transaksi)`;
    const mostActiveSupplierMessage = `${mostActiveSupplier?.name} (${mostActiveSupplier.transaction} transaksi)`;
    const mostMotifMessage = `${mostMotif?.name} (${mostMotif?.total_stock} pcs)`;

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
                <KpiCard label="Transaksi Hari Ini" data={transactionTodayMessage} />
                <KpiCard label="Motif Terbanyak" data={mostMotifMessage} />
                <KpiCard label="Distributor Teraktif" data={mostActiveDistributorMessage} />
                <KpiCard label="Supplier Teraktif" data={mostActiveSupplierMessage} />
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
                <div className="flex-1 flex flex-col cs:flex-row items-start flex-wrap gap-4">
                    <div className="flex-1 container py-10">
                        <Suspense fallback={<SkeletonTable className="h-full w-full" />}>
                            <DataTableBatik />
                        </Suspense>
                    </div>
                    <div className="flex-1 container py-10">
                        <Suspense fallback={<SkeletonTable className="h-full w-full" />}>
                            <DataTableTransaction />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;
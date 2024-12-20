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
import {DataTableBatik, DataTableTransaction} from "@/components/MyDataTables";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';
import { useEffect } from "react";

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
    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle>Some Recent Fact</CardTitle>
                <CardDescription>Lorem Ipsum</CardDescription>
            </CardHeader>
            <Button
                className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                color="primary"
            >
                <RefreshCw color="#FFFFFF" />
            </Button>
            <CardContent className="grid grid-cols-2 gap-4">
                <KpiCard label="Total Stok Batik" data="1,250 kain batik" />
                <KpiCard label="Motif Terbanyak" data="Motif Parang (350 pcs)" />
                <KpiCard label="Stok Hampir Habis" data="8 jenis produk" />
                <KpiCard label="Transaksi Hari Ini" data="15 transaksi" />
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
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <CardStatistic />
                    </div>
                    <div className="flex-1">
                        <ChartArea />
                    </div>
                    <div className="flex-1">
                        <ChartPie />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <DataTableBatik />
                    </div>
                    <div className="flex-1">
                        <DataTableTransaction />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;

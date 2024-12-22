import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SkeletonChartPie() {
    return (
        <Card className="flex flex-col justify-center items-center h-full gap-8 relative">
            <Button
                className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                color="primary"
                disabled
            >
                <RefreshCw color="#FFFFFF" />
            </Button>
            <CardHeader className="items-center pb-0">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-36 h-4" />
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <Skeleton className="w-48 h-48 rounded-full"></Skeleton>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <Skeleton className="w-52 h-4" />
                <Skeleton className="w-64 h-4" />
            </CardFooter>
        </Card>
    )
}

function SkeletonChartArea() {
    return (
        <Card className="h-full flex flex-col justify-between relative">
            <Button
                className="absolute w-8 h-8 top-0 right-0 rounded-l-none rounded-b-none"
                color="primary"
                disabled
            >
                <RefreshCw color="#FFFFFF" />
            </Button>
            <CardHeader>
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-36 h-4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-64" />
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <Skeleton className="w-48 h-4" />
                        <Skeleton className="w-36 h-4" />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

function SkeletonTable() {
    return (
        <Card className="p-4">
            <div className="space-y-2">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Skeleton className="w-6 h-4" />
                        <Skeleton className="flex-1 h-4" />
                        <Skeleton className="flex-1 h-4" />
                        <Skeleton className="flex-1 h-4" />
                        <Skeleton className="flex-1 h-4" />
                    </div>
                ))}
            </div>
        </Card>
    );
};

function SkeletonBatikForm() {
    return (
        <Card className="p-4">
            <CardHeader>
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-36 h-4" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="w-full h-10" />
            </CardFooter>
        </Card>
    );
}

export { SkeletonChartPie, SkeletonTable, SkeletonChartArea, SkeletonBatikForm };
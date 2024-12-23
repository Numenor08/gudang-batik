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

function SkeletonTable({ className, loopRow = 10, loopCol = 5, height = 4 }) {
    return (
        <Card className={"p-4 " + className}>
            <div className="space-y-2">
                {[...Array(loopRow)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Skeleton className={`w-8 h-${height}`} />
                        {[...Array(loopCol)].map((_, index) => (
                            <Skeleton key={index} className={`flex-1 h-${height}`} />
                        ))}
                    </div>
                ))}
            </div>
            <div className="my-4 flex flex-row items-center justify-between">
                <div>
                    <Skeleton className='w-20 h-6'></Skeleton>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <Skeleton className='w-[4.5rem] h-6'></Skeleton>
                    </div>
                    <div>
                        <Skeleton className='w-14 h-6'></Skeleton>
                    </div>
                </div>
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

function SkeletonProfileForm({ message = null }) {
    return (
        <>
            {message && <div className="text-red-500 text-center">{message}</div>}
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="pb-0">
                    <Skeleton className="w-48 h-6 mx-auto" />
                </CardHeader>
                <div className="border-b border-gray-200 w-full my-4" />
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 flex flex-col items-center justify-center space-y-6">
                            <Skeleton className="w-56 h-56 rounded-full" />
                            <Skeleton className="w-32 h-10" />
                        </div>
                        <div className="w-full md:w-2/3 space-y-6">
                            <div className="flex items-center gap-6 space-x-2">
                                <Skeleton className="w-6 h-6" />
                                <Skeleton className="w-32 h-6" />
                                <Skeleton className="w-6 h-6" />
                                <Skeleton className="w-48 h-6" />
                            </div>
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export { SkeletonChartPie, SkeletonTable, SkeletonChartArea, SkeletonBatikForm, SkeletonProfileForm };
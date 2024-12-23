import MyBreadCrumb from "@/components/MyBreadCrumb";
import { useEffect, Suspense } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';
import { DataTableReport } from "@/components/MyDataTables";
import { SkeletonTable } from "@/components/skeleton/MySkeleton";

function Report() {
    const urlHere = '/dashboard/report';
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);
    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: urlHere, label: "Report" }]}
            />
            <div className="m-8 flex flex-col gap-8">
                <h1 className="text-3xl font-bold">Activity Report</h1>
                <Suspense fallback={<SkeletonTable loopCol={5} loopRow={8} height={8} />}>
                    <DataTableReport />
                </Suspense>
            </div>
        </>
    )
}

export default Report
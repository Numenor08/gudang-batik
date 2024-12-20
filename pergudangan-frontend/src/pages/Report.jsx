import MyBreadCrumb from "@/components/MyBreadCrumb";
import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

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
            <div className="m-8 flex flex-col gap-8">Report</div>
        </>
    )
}

export default Report
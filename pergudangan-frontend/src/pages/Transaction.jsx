import MyBreadCrumb from "@/components/MyBreadCrumb";
import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

function Transaction() {
    const urlHere = '/dashboard/transaction';
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);
    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: urlHere, label: "Transaction" }]}
            />
            <div className="m-8 flex flex-col gap-8">Transaction</div>
        </>
    )
}

export default Transaction
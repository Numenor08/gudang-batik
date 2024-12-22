import MyBreadCrumb from "@/components/MyBreadCrumb";
import { DataTableTransaction2 } from "@/components/MyDataTables";
import { useEffect } from "react";
import { useUrl } from '@/hooks/UrlProvider';
import AddTransactionForm from "@/components/AddTransactionForm";

function Transaction() {
    const urlHere = '/dashboard/transaction';
    const { setUrl } = useUrl();
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
            <div className="m-8">
                <h1 className="text-3xl mb-8 font-bold">Transaction</h1>
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                    <div className="flex-1 container min-w-96">
                        <DataTableTransaction2 className="" />
                    </div>
                    <div className="flex-none">
                        <AddTransactionForm className="max-w-96" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transaction;
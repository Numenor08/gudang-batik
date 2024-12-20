import MyBreadCrumb from "@/components/MyBreadCrumb";
import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

function Supplier() {
    const urlHere = '/dashboard/supplier';
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: urlHere, label: "Supplier" }]}
            />
            <div className="m-8 flex flex-col gap-8">Supplier</div>
        </>
    )
}

export default Supplier
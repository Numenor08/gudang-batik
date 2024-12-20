import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

function ManageSupplier() {
    const urlHere = "/dashboard/management/supplier";
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    return (
        <div>ManageSupplier</div>
    )
}

export default ManageSupplier
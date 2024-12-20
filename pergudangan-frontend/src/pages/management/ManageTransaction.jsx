import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

function ManageTransaction() {
    const urlHere = "/dashboard/management/transaction";
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    return (
        <div>ManageTransaction</div>
    )
}

export default ManageTransaction
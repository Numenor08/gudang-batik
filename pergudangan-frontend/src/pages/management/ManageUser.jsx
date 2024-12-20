import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

function ManageUser() {
    const urlHere = "/dashboard/management/user";
    const { setUrl } = useUrl(UrlContext);
    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    return (
        <div>ManageUser</div>
    )
}

export default ManageUser
import { useEffect } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';

function ManageItem() {
  const urlHere = "/dashboard/management/item";
  const { setUrl } = useUrl(UrlContext);
  useEffect(() => {
    setUrl(urlHere);
  }, [setUrl]);

  return (
    <div>ManageItem</div>
  )
}

export default ManageItem
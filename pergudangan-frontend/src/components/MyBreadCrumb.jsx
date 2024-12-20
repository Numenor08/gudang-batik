import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function MyBreadCrumb({ items }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="cursor-default">
                    <p>...</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem>
                            {item.type === 'link' ? (
                                <BreadcrumbLink asChild>
                                    <Link to={item.path}>{item.label}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>
                                    {item.label}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default MyBreadCrumb;
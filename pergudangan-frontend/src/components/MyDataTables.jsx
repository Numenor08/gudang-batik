import DataTable from "@/components/DataTable";
import { batik, transaction, batikColumns, categoryColumns, supplierColumns, userColumns, transaction2, reportColumns } from "@/components/Columns";
import useSWR from 'swr';

export function DataTableBatik({className}) {
    const { data: batikData, error } = useSWR(`/api/batik`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className={className} columns={batik} data={batikData} />
    );
}

export function DataTableTransaction({className}) {
    const { data: transactionData, error } = useSWR(`/api/transactions`);
    const formattedTransactionData = transactionData?.map(transaction => ({
        ...transaction,
        type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
        quantity: transaction.supplier_id ? `+${transaction.quantity}` : `-${transaction.quantity}`,
    }));
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className={className} columns={transaction} data={formattedTransactionData} />
    );
}

export function DataTableTransaction2({className}) {
    const { data: transactionData, error } = useSWR(`/api/transactions`);
    const formattedTransactionData = transactionData?.map(transaction => ({
        ...transaction,
        type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
        quantity: transaction.supplier_id ? `+${transaction.quantity}` : `-${transaction.quantity}`,
        created_at: new Date(transaction.created_at).toLocaleDateString('en-GB')
    }));

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className={className} columns={transaction2} data={formattedTransactionData} />
    );
}

export function DataTableBatik2({ onEdit, onDelete }) {
    const { data: batikData, error } = useSWR(`/api/batik`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className={"container"} onEdit={onEdit} onDelete={onDelete} columns={batikColumns} data={batikData} />
    );
}

export function DataTableSupplier({ onEdit, onDelete }) {
    const { data: supplierData, error } = useSWR(`/api/suppliers`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className="container" columns={supplierColumns} data={supplierData} onEdit={onEdit}
        onDelete={onDelete} />
    );
}

export function DataTableDistributor({ onEdit, onDelete }) {
    const { data: supplierData, error } = useSWR(`/api/distributors`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className="container" columns={supplierColumns} data={supplierData} onEdit={onEdit}
        onDelete={onDelete} />
    );
}

export function DataTableUser({ onEdit, onDelete }) {
    const { data: userData, error } = useSWR(`/api/auth`);
    const formattedUserData = userData?.map(user => ({
        ...user,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1)
    }));
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
    <DataTable className="container" columns={userColumns} data={formattedUserData} onEdit={onEdit} onDelete={onDelete} />
    );
}

export function DataTableCategory({ onEdit, onDelete, className }) {
    const { data: categories, error } = useSWR(`/api/categories`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable
            className={className}
            columns={categoryColumns}
            data={categories || []}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
}

export function DataTableReport({ onEdit, onDelete, className }) {
    const { data: report, error } = useSWR(`/api/logs`);
    const formattedReport = report?.map(report => ({
        ...report,
        created_at: new Date(report.created_at).toLocaleDateString('en-GB')
    }));
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable
            className={className}
            columns={reportColumns}
            data={formattedReport || []}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
}
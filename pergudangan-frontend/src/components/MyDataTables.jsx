import DataTable from "@/components/DataTable";
import { batik, transaction, batikColumns, supplierColumns } from "@/components/Columns";
import useSWR from 'swr';

function DataTableBatik() {
    const { data: batikData, error } = useSWR(`/api/batik`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable columns={batik} data={batikData} />
    );
}

function DataTableTransaction() {
    const { data: transactionData, error } = useSWR(`/api/transactions`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable columns={transaction} data={transactionData} />
    );
}

function DataTableBatik2({ onEdit, onDelete }) {
    const { data: batikData, error } = useSWR(`/api/batik`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className={"container"} onEdit={onEdit} onDelete={onDelete} columns={batikColumns} data={batikData} />
    );
}

function DataTableSupplier({ onEdit, onDelete }) {
    const { data: supplierData, error } = useSWR(`/api/suppliers`);

    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <DataTable className="container" columns={supplierColumns} data={supplierData} onEdit={onEdit}
        onDelete={onDelete} />
    );
}

export { DataTableBatik, DataTableTransaction, DataTableBatik2, DataTableSupplier };
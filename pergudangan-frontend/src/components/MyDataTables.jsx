import DataTable from "@/components/DataTable";
import { columns, columns2 } from "@/components/Columns";
// import { useEffect, useState, Suspense } from "react";
// import { useAuth } from "@/hooks/AuthProvider";
// import swr from "swr";

    const data = [
        {
            id: 2,
            name: "Batik Fake Mojokerto",
            color: "Hijau",
            size: "L",
            stock: 200,
            min_stock: 20,
            img: "this is gambar",
            created_at: "2024-12-20T04:12:59.000Z",
            category_id: 1
        },
        {
            id: 3,
            name: "Batik Fake Bojonegoro",
            color: "Biru Muda",
            size: "M",
            stock: 325,
            min_stock: 25,
            img: "this is gambar",
            createdat: "2024-12-20T04:18:43.000Z",
            categoryid: 1
        }
    ]

const data2 = [
    {
        id: 1,
        date: "2023-10-01",
        type: "Purchase",
        total: 500,
        user: "John Doe",
    },
    {
        id: 2,
        date: "2023-10-02",
        type: "Sale",
        total: 300,
        user: "Jane Smith",
    },
    {
        id: 3,
        date: "2023-10-03",
        type: "Purchase",
        total: 700,
        user: "Alice Johnson",
    },
    {
        id: 4,
        date: "2023-10-04",
        type: "Sale",
        total: 200,
        user: "Bob Brown",
    },
    {
        id: 5,
        date: "2023-10-05",
        type: "Purchase",
        total: 400,
        user: "Charlie Davis",
    }
]

function DataTableBatik() {
    // const { token } = useAuth();
    // const fetcher = (url) => fetch(url, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }).then((res) => res.json());

    // const { data: batikData, error } = swr("http://localhost:5000/api/batik", fetcher);

    // if (error) return <div>Error loading data</div>;
    // if (!batikData) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

function DataTableTransaction() {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns2} data={data2} />
        </div>
    )
}

export { DataTableBatik, DataTableTransaction };
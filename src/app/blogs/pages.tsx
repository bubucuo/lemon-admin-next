"use client";

import { useState, useEffect } from "react";
import { Table, Button } from "antd";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blog");
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => (
        <Button type="primary" onClick={() => console.log(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

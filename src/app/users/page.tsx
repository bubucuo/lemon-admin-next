"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Table,
  Button,
  Card,
  Input,
  InputNumber,
  Popconfirm,
} from "antd";
// import userApi from "src/api/user";

interface DataType {
  id: string;
  username: string;
  age: number;
  address: string;
  phone: string;
  code: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Page() {
  const [form] = Form.useForm();

  const [data, setData] = useState<DataType[]>([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:3001/api/user/list?pageNo=1&pageSize=10"
      );
      const result = await res.json();
      setData(result.content);
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
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Button
                  type="link"
                  onClick={() => save(record.key)}
                  style={{ marginInlineEnd: 8 }}
                >
                  Save
                </Button>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <>
                <Button type="link" onClick={() => edit(record)}>
                  Edit
                </Button>
                <Button type="link" onClick={() => console.log(record)}>
                  delete
                </Button>
              </>
            )}
          </>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DataType>["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Card title="User List">
        <Form form={form} component={false}>
          <Table
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowKey="id"
            components={{
              body: { cell: EditableCell },
            }}
            rowClassName="editable-row"
            pagination={{ onChange: cancel }}
          />
        </Form>
      </Card>
    </div>
  );
}

"use client";
import React from "react";
import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  UserOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  // { key: "/blogs", icon: <ContainerOutlined />, label: "blogs" },
  // { key: "/users", icon: <ContainerOutlined />, label: "users" },
  // { key: "/advance", icon: <ContainerOutlined />, label: "advance" },
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    children: [
      {
        key: "analysis",
        label: "Analysis",
      },
      { key: "monitor", label: "Monitor" },
      { key: "workplace", label: "Workplace" },
    ],
  },
  {
    key: "form",
    label: "Form",
    icon: <FormOutlined />,
    children: [
      { key: "basic-form", label: "Basic Form" },
      { key: "step-form", label: "Step Form" },
      { key: "advanced-form", label: "Advanced Form" },
    ],
  },
  {
    key: "list",
    label: "List",
    icon: <TableOutlined />,
    children: [
      { key: "table-list", label: "Table List" },
      { key: "basic-list", label: "Basic List" },
      {
        key: "search",
        label: "Search List",
        children: [
          { key: "articles", label: "Search List(articles)" },
          { key: "projects", label: "Search List(projects)" },
          { key: "applications", label: "Search List(applications)" },
        ],
      },
    ],
  },

  {
    key: "profile",
    label: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { key: "basic-profile", label: "Basic Profile" },
      { key: "more", label: "More Profile" },
    ],
  },

  {
    key: "result",
    label: "Result",
    icon: <CheckCircleOutlined />,
    children: [
      { key: "success", label: "Success" },
      { key: "fail", label: "Fail" },
    ],
  },

  {
    key: "exception",
    label: "Exception",
    icon: <WarningOutlined />,
    children: [
      { key: "403", label: "403" },
      { key: "404", label: "404" },
      { key: "500", label: "500" },
    ],
  },
  {
    key: "account",
    label: "Account",
    icon: <UserOutlined />,
    children: [
      { key: "center", label: "center" },
      { key: "settings", label: "settings" },
    ],
  },
];

const LeftSider: React.FC = () => {
  const router = useRouter();
  return (
    <Menu
      defaultSelectedKeys={["dashboard/analysis"]}
      defaultOpenKeys={["dashboard"]}
      mode="inline"
      items={items}
      onClick={(e) => {
        const path = "/" + e.keyPath.reverse().join("/");
        router.push(path);
      }}
    />
  );
};

export default LeftSider;

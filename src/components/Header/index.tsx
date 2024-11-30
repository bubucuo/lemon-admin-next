"use client";
import React from "react";
import Image from "next/image";
import { Flex } from "antd";
// import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd/lib";

const CustomHeader: React.FC = (props) => {
  const user = { name: "header user" }; //useSelector((state) => state.user);
  const items: MenuProps["items"] = [
    {
      label: <a>退出登录</a>,
      key: "0",
    },
  ];

  return (
    <Flex
      {...props}
      align="center"
      justify="space-between"
      className="px-[20px] h-14 leading-[56px] bg-transparent z-19 bg-white fixed top-0 left-0 w-full z-50 opacity-80"
      style={{
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
      }}
    >
      <Image alt="next" src="/next.svg" width={180} height={38} priority />
      <Dropdown menu={{ items }} className="">
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {user?.name || "用户"}
          <DownOutlined />
        </a>
      </Dropdown>
    </Flex>
  );
};

export default CustomHeader;

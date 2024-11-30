"use client";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Header from "src/components/Header";
import LeftSider from "src/components/LeftSider";
import { store } from "src/store";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 判断登录状态
  const path = usePathname();

  useEffect(() => {
    console.log("omg", store.getState());
  });
  return (
    <Provider store={store}>
      {path.indexOf("/login") !== -1 ? (
        children
      ) : (
        <Layout className="flex w-screen pt-[56px]">
          <Header />
          <Layout className="pl-[200px]">
            <Sider
              className="h-screen fixed top-[56px] left-0"
              theme="light"
              style={{
                position: "fixed",
              }}
            >
              <LeftSider />
            </Sider>
            <Content className="flex-1 p-4 overflow-auto">{children}</Content>
          </Layout>
        </Layout>
      )}
    </Provider>
  );
}

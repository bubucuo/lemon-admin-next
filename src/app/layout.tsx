import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import localFont from "next/font/local";
import "../globals.css";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import LeftSider from "../components/LeftSider";
import Header from "src/components/Header";
import StoreProvider from "src/store/StoreProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <Layout className="flex w-screen pt-[56px]">
            <Header />
            <Layout className="pl-[200px]">
              <Sider
                className="h-screen fixed top-[56px] left-0 "
                theme="light"
                style={{
                  position: "fixed",
                }}
              >
                <LeftSider />
              </Sider>
              <Content className="flex-1 p-4 overflow-auto">
                <StoreProvider>{children}</StoreProvider>
              </Content>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}

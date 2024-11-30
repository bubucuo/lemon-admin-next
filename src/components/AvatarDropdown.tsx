"use client";
import { outLogin } from "src/services/api";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { createStyles } from "antd-style";
import { stringify } from "querystring";
import React, { useCallback } from "react";
import { flushSync } from "react-dom";
import HeaderDropdown from "./HeaderDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateUser } from "src/store/userSlice";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const currentUser = useSelector((state) => state.user);
  return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: "flex",
      height: "48px",
      marginLeft: "auto",
      overflow: "hidden",
      alignItems: "center",
      padding: "0 8px",
      cursor: "pointer",
      borderRadius: token.borderRadius,
      "&:hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  menu,
  children,
}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */

  const router = useRouter();
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get("redirect");
    // Note: There may be security issues, please note
    if (window.location.pathname !== "/user/login" && !redirect) {
      router.replace({
        pathname: "/user/login",
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const { styles } = useStyles();

  // const { initialState, setInitialState } = useModel("@@initialState");
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === "logout") {
      flushSync(() => {
        dispatch(updateUser({}));
        // setInitialState((s) => ({ ...s, currentUser: undefined }));
      });
      loginOut();
      return;
    }
    router.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!currentUser) {
    return loading;
  }

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: "center",
            icon: <UserOutlined />,
            label: "个人中心",
          },
          {
            key: "settings",
            icon: <SettingOutlined />,
            label: "个人设置",
          },
          {
            type: "divider" as const,
          },
        ]
      : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};

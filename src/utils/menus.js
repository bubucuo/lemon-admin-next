export const menus = [
  {
    title: "首页",
    icon: "House",
    path: "/",
  },
  {
    title: "用户管理",
    icon: "User",
    path: "/user",
    children: [
      {
        title: "用户列表",
        path: "/user/list",
      },
      {
        title: "添加用户",
        path: "/user/add",
      },
      {
        title: "用户详情",
        path: "/user/detail",
      },
    ],
  },
  {
    title: "商品管理",
    icon: "Goods", //"el-icon-product",
    path: "/product",
    children: [
      {
        title: "商品列表",
        path: "/product/list",
      },
      {
        title: "添加商品",
        path: "/product/add",
      },
      {
        title: "商品详情",
        path: "/product/detail",
      },
    ],
  },
  {
    title: "订单管理",
    icon: "Sell", //"el-icon-s-order",
    path: "/order",
    children: [
      {
        title: "订单列表",
        path: "/order/list",
      },
      {
        title: "添加订单",
        path: "/order/add",
      },
      {
        title: "订单详情",
        path: "/order/detail",
      },
    ],
  },
];

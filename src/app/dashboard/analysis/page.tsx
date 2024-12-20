"use client";
import { EllipsisOutlined } from "@ant-design/icons";
import { GridContent } from "@ant-design/pro-components";
import { Col, Dropdown, Row, message } from "antd";
import type { RangePickerProps } from "antd/es/date-picker/generatePicker";
import type { RadioChangeEvent } from "antd/es/radio";
import type dayjs from "dayjs";
import { Suspense, useEffect, useState } from "react";
import IntroduceRow from "./components/IntroduceRow";
import OfflineData from "./components/OfflineData";
import PageLoading from "./components/PageLoading";
import ProportionSales from "./components/ProportionSales";
import type { TimeType } from "./components/SalesCard";
import SalesCard from "./components/SalesCard";
import TopSearch from "./components/TopSearch";
import type { AnalysisData } from "./data.d";
import { fakeChartData } from "./service";
import useStyles from "./style.style";
import { getTimeDistance } from "./utils/utils";
type RangePickerValue = RangePickerProps<dayjs.Dayjs>["value"];
export type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};
type SalesType = "all" | "online" | "stores";
// export const Analysis: FC<AnalysisProps> = () => {
export default function Analysis() {
  const { styles } = useStyles();
  const [salesType, setSalesType] = useState<SalesType>("all");
  const [currentTabKey, setCurrentTabKey] = useState<string>("");
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance("year")
  );

  const [loading, setLoading] = useState(true); // 定义 state 存储加载状态
  const [data, setData] = useState(null); // 定义 state 存储数据。没有做缓存。如果想做缓存，可以存储到 localStorage/session 中。常见使用redux-persist

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fakeChartData(); // 异步获取数据
        setData(res.data.data); // 将数据存入 state
        setLoading(false); // 设置加载状态为 false
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // 调用异步函数
  }, []);




  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };
  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return "";
    }
    const value = getTimeDistance(type);
    if (!value) {
      return "";
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return "";
    }
    if (
      rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, "day") &&
      rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, "day")
    ) {
      return styles.currentDate;
    }
    return "";
  };

  let salesPieData;

  if (salesType === "all") {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData =
      salesType === "online"
        ? data?.salesTypeDataOnline
        : data?.salesTypeDataOffline;
  }

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: "操作一",
            },
            {
              key: "2",
              label: "操作二",
            },
          ],
        }}
        placement="bottomRight"
      >
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );
  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };
  const handleTabChange = (key: string) => {
    setCurrentTabKey(key);
  };
  const activeKey =
    currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || "";
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} />
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>

        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense>
      </>
    </GridContent>
  );
};
// export default Analysis;

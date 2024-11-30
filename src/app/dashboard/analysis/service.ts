import http from "src/utils/http";
import type { AnalysisData } from "./data";

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return http.get("/api/fake_analysis_chart_data");
}

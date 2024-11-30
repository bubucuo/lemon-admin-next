import http from "src/utils/http";

export async function fakeSubmitForm(params: any) {
  // return request("/api/advancedForm", {
  //   method: "POST",
  //   data: params,
  // });
  return http.post("/api/advancedForm", params);
}

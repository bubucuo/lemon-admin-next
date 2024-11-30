"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from ".";
import { updateUser, type User } from "./userSlice";

export default function StoreProvider({
  children,
}: {
  userInfo: User;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // init
    storeRef.current.dispatch(updateUser({ name: "ooo", email: "ooo" }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

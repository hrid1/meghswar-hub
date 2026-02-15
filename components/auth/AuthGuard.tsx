"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


import { logOut, setUser } from "@/redux/features/auth/authSlice";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.access_token);

  const { data, error, isLoading, isFetching } = useGetCurrentUserQuery(
    undefined,
    { skip: !accessToken }
  );

  useEffect(() => {
    if (!accessToken) router.replace("/login");
  }, [accessToken, router]);

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  useEffect(() => {
    const status = (error as any)?.status;
    if (status === 401 || status === 403) {
      dispatch(logOut());
      router.replace("/login");
    }
  }, [error, dispatch, router]);

  if (!accessToken) return null;
  if (isLoading || isFetching) return null;

  return <>{children}</>;
}

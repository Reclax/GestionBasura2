import { useCallback, useEffect, useMemo, useState } from "react";
import {
  assignReportToRoute,
  createReport,
  createRoute,
  finishRoute,
  getDashboardData,
  startRoute,
  toggleStop,
  updateReportStatus,
} from "../services/wasteApi";

export function useWasteSystem() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    drivers: [],
    reports: [],
    routes: [],
    metrics: { pending: 0, inRoute: 0, solved: 0, activeRoutes: 0 },
  });

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const dashboard = await getDashboardData();
      setData(dashboard);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const actions = useMemo(
    () => ({
      async createReport(payload) {
        await createReport(payload);
        await refreshData();
      },
      async updateReportStatus(reportId, status) {
        await updateReportStatus(reportId, status);
        await refreshData();
      },
      async createRoute(payload) {
        await createRoute(payload);
        await refreshData();
      },
      async assignReportToRoute(routeId, reportId) {
        await assignReportToRoute(routeId, reportId);
        await refreshData();
      },
      async startRoute(routeId) {
        await startRoute(routeId);
        await refreshData();
      },
      async toggleStop(routeId, reportId) {
        await toggleStop(routeId, reportId);
        await refreshData();
      },
      async finishRoute(routeId) {
        await finishRoute(routeId);
        await refreshData();
      },
      refreshData,
    }),
    [refreshData],
  );

  return {
    ...data,
    loading,
    error,
    actions,
  };
}

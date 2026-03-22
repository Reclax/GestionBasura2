const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "No se pudo completar la operacion");
  }

  return payload.data;
}

export function getDashboardData() {
  return request("/dashboard");
}

export function createReport(report) {
  return request("/reports", {
    method: "POST",
    body: JSON.stringify(report),
  });
}

export function updateReportStatus(reportId, status) {
  return request(`/reports/${reportId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function createRoute(route) {
  return request("/routes", {
    method: "POST",
    body: JSON.stringify(route),
  });
}

export function assignReportToRoute(routeId, reportId) {
  return request(`/routes/${routeId}/assign-report`, {
    method: "POST",
    body: JSON.stringify({ reportId }),
  });
}

export function startRoute(routeId) {
  return request(`/routes/${routeId}/start`, {
    method: "POST",
  });
}

export function toggleStop(routeId, reportId) {
  return request(`/routes/${routeId}/toggle-stop`, {
    method: "POST",
    body: JSON.stringify({ reportId }),
  });
}

export function finishRoute(routeId) {
  return request(`/routes/${routeId}/finish`, {
    method: "POST",
  });
}

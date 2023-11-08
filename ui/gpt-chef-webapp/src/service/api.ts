function formatQuery(queryParams?: Record<string, string | number>) {
  return (
    (queryParams &&
      Object.keys(queryParams).length &&
      "?" +
        Object.keys(queryParams)
          .map((key) =>
            queryParams[key]
              ? `${key}=${encodeURIComponent(queryParams[key])}`
              : key
          )
          .join("&")) ||
    ""
  );
}

export async function post(
  url: string,
  data: Record<string, string | number>,
  queryParams?: Record<string, string | number>
) {
  const query = formatQuery(queryParams);

  const response = await fetch(`${url}${query}`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response?.json();
}

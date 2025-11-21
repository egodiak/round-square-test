export default (
  input: Parameters<typeof fetch>[0],
  init: Parameters<typeof fetch>[1]
) =>
  fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      authorization: sessionStorage.getItem("authToken") || "",
    },
  }).then((res) => (res.ok ? res.json() : null));

export interface Parameters {
  name: string;
  required: boolean;
  in: "query" | "path" | "header" | "cookie";
  value: unknown;
  schema: {
    default?: unknown;
    type: unknown;
  };
}

export const getUrlWithParameters = (
  url: string,
  parameters: Array<Parameters>
) => {
  parameters.forEach((param) => {
    if (param.in === "path" && param.required) {
      url = url.replace(`{${param.name}}`, String(param.value));
    }
  });
  return url;
};

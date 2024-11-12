import { getUrlWithParameters, Parameters } from ".";

describe("getUrlWithParameters", () => {
  it("should return the url with the parameters", () => {
    const url = "http://localhost:3001/api/sse/{id}";

    const parameters = [
      {
        name: "id",
        required: true,
        in: "path" as const,
        schema: {
          type: "string",
        },
        value: "1212",
      },
    ];

    const result = getUrlWithParameters(url, parameters);

    expect(result).toBe("http://localhost:3001/api/sse/1212");
  });

  it("should return the url with the parameters", () => {
    const url = "http://localhost:3001/api/sse/";

    const parameters = [] as Parameters[];

    const result = getUrlWithParameters(url, parameters);

    expect(result).toBe("http://localhost:3001/api/sse/");
  });
});

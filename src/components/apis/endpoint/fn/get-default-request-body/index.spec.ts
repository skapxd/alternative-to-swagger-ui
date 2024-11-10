import { getDefaultRequestBody } from ".";

describe("get-default-request-body", () => {
  it("return default values form full swagger object", () => {
    const input = {
      $ref: "SendMessageDTO",
      swaggerAsJson: {
        components: {
          schemas: {
            SendMessageDTO: {
              type: "object",
              properties: {
                phone: {
                  type: "string",
                  default: "573000000000",
                },
                message: {
                  type: "string",
                  default: "Hello world",
                },
              },
              required: ["phone", "message"],
            },
          },
        },
      },
    };

    const output = {
      phone: "573000000000",
      message: "Hello world",
    };

    expect(getDefaultRequestBody(input)).toStrictEqual(output);
  });

  it("get nested default values", () => {
    const input = {
      $ref: "#/components/schemas/CounterDto",
      swaggerAsJson: {
        components: {
          schemas: {
            SendMessageDTO: {
              type: "object",
              properties: {
                phone: {
                  type: "string",
                  default: "5730000000002",
                },
                message: {
                  type: "string",
                  default: "Hello world",
                },
              },
              required: ["phone", "message"],
            },
            NotificationsDto: {
              type: "object",
              properties: {
                event: {
                  type: "string",
                  default: "notification",
                },
                data: {
                  type: "string",
                  default: "notification value",
                },
              },
              required: ["event", "data"],
            },
            Counter: {
              type: "object",
              properties: {
                counter: {
                  type: "number",
                  default: 0,
                },
              },
              required: ["counter"],
            },
            CounterDto: {
              type: "object",
              properties: {
                event: {
                  type: "string",
                  default: "counter",
                },
                data: {
                  $ref: "#/components/schemas/Counter",
                },
              },
              required: ["event", "data"],
            },
            QueueDTO: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  default: "audio.mp3",
                },
              },
              required: ["file"],
            },
            FileDTO: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
              },
              required: ["file"],
            },
            CreateMongooseDto: {
              type: "object",
              properties: {},
            },
            UpdateMongooseDto: {
              type: "object",
              properties: {},
            },
            CreateTypeormDto: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                  default: "label",
                },
                value: {
                  type: "string",
                  default: "label",
                },
              },
              required: ["label", "value"],
            },
            UpdateTypeormDto: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                  default: "label",
                },
                value: {
                  type: "string",
                  default: "label",
                },
              },
            },
          },
        },
      },
    };

    const output = {
      event: "counter",
      data: {
        counter: 0,
      },
    };

    expect(getDefaultRequestBody(input)).toStrictEqual(output);
  });
});

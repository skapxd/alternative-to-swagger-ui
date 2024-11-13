import { processFetchStream } from ".";

describe("process-fetch-stream", () => {
  // Processes a stream with an async iterator correctly
  it("should process each chunk of a stream with an async iterator", async () => {
    const chunks = [
      new Uint8Array([72, 101, 108, 108, 111]),
      new Uint8Array([87, 111, 114, 108, 100]),
    ];

    const stream = {
      [Symbol.asyncIterator]: async function* () {
        for (const chunk of chunks) {
          yield chunk;
        }
      },
    };

    const callBack = vi.fn();

    // @ts-expect-error: Testing purposes only
    await processFetchStream(stream, callBack);
    expect(callBack).toHaveBeenCalledWith("Hello");
    expect(callBack).toHaveBeenCalledWith("World");
  });

  it("should process each chunk of a stream without an async iterator", async () => {
    const chunks = [
      new Uint8Array([72, 101, 108, 108, 111]),
      new Uint8Array([87, 111, 114, 108, 100]),
    ];

    const stream = {
      getReader: () => ({
        read: () =>
          Promise.resolve({
            done: chunks.length === 0,
            value: chunks.shift(),
          }),
      }),
    };

    const callBack = vi.fn();

    // @ts-expect-error: Testing purposes only
    await processFetchStream(stream, callBack);
    expect(callBack).toHaveBeenCalledWith("Hello");
    expect(callBack).toHaveBeenCalledWith("World");
  });

  // Handles null or undefined stream inputs gracefully
  it("should not call callback when stream is null or undefined", async () => {
    const callBack = vi.fn();

    // @ts-expect-error: Testing purposes only
    await processFetchStream(null, callBack);
    expect(callBack).not.toHaveBeenCalled();

    // @ts-expect-error: Testing purposes only
    await processFetchStream(undefined, callBack);
    expect(callBack).not.toHaveBeenCalled();
  });
});

function hasAsyncIterator<T extends object>(
  stream: T
): stream is T & { [Symbol.asyncIterator](): AsyncIterator<Uint8Array> } {
  if (Symbol.asyncIterator in stream === false) return false;
  if (typeof stream[Symbol.asyncIterator] !== "function") return false;

  return true;
}

export const processFetchStream = async (
  stream: ReadableStream<Uint8Array>,
  callBack: (chunk: string) => void
) => {
  if (stream == null) return false;
  if (typeof stream !== "object") return false;

  if (hasAsyncIterator(stream) === true) {
    for await (const chunk of stream) {
      const chunkString = new TextDecoder().decode(chunk);

      callBack(chunkString);
    }
  }

  if (hasAsyncIterator(stream) === false) {
    const reader = stream.getReader();

    const read = async () => {
      const { done, value } = await reader.read();

      if (done === true) return;

      const chunkString = new TextDecoder().decode(value);

      callBack(chunkString);

      await read();
    };

    await read();
  }
};

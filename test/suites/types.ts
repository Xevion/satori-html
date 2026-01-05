export interface ExpectMatcher {
  toEqual(expected: any): void;
  toBe(expected: any): void;
  toThrow?(pattern?: string | RegExp): void;
  toMatchImageSnapshot?(): void;
}

export interface TestRunner {
  describe(name: string, fn: () => void): void;
  test(name: string, fn: () => void | Promise<void>): void;
  expect(actual: any): ExpectMatcher;
}

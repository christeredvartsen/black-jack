export default {
  get: jest.fn(() => Promise.resolve({ data: [] })),
  CancelToken: {
    source: jest.fn(() => ({
      cancel: jest.fn((message) => { }),
      token: {},
    })),
  },
};
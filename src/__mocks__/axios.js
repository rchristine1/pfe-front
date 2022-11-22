export default {
    __esModule: true,
    get: jest.fn(() => Promise.resolve({data: {}})),
    default: jest.fn(() => Promise.resolve({ data: {} })),
};
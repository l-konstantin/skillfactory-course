import { getPercents } from './getPercents.js';

test('function return percent of number', () => {
    const result = getPercents(30, 200);
    expect(result).toBe(60);
});
import { getPercents } from './getPercents.js';

describe('граничные случаи', () => {
    it("equal 0", () => {
        const result = getPercents(20, 0);
        expect(result).toBe(0);
    }),
    it("equal 1", () => {
        const result = getPercents(0, 20);
        expect(result).toBe(0);
    }),
    it("equal 1", () => {
        const result = getPercents(30, 200);
        expect(result).toBe(60);
    });
});
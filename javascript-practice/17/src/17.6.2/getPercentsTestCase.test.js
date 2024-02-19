import { getPercents } from './getPercents.js';

describe("Успешный/неуспешный тест", () => {
    it("Успешный тест", () => {
        const result = getPercents(30, 200);
        expect(result).toBe(60);
    }),
    xit("Неуспешный тест", () => {
        const result = getPercents(30, 200);
        expect(result).toBe(50);
    });
});
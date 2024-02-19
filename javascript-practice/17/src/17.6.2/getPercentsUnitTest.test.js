import { getPercents } from "./getPercents";

describe('юнит-тест работы функции', () => {
    it("корректная работа функции", () => {
        expect(getPercents(30, 200)).toBe(60);
    }),
    it("результат будет равен 0", () => {
        expect(getPercents(30, 0)).toBe(0);
    }),
    it('$number и $percent не могут быть отрицательными', () => {
        expect(getPercents(30, -1)).toBe(-0.3);
    })
});
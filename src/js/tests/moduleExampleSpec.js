import { greeting } from "../moduleExample";

describe("moduleExample tests", function () {
    it("greeting() returns Hello World", function () {
        expect(greeting()).toEqual("Hello World");
    });
});

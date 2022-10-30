const Engineer = require("../lib/Engineer");

test("Can set Github account via constructor", () => {
    const testValue = "GitHubUser";
    const e = new Engineer("Foo", 1, "test@gmail.com", testValue);
    expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
    const testValue = "Engineer";
    const e = new Engineer("Foo", 1, "test@gmail.com", "GitHubUser");
    expect(e.getRole()).toBe(testValue);
});

test("Can get Github account via getGithub()", () => {
    const testValue = "GitHubUser";
    const e = new Engineer("Foo", 1, "test@gmail.com", testValue);
    expect(e.getGithub()).toBe(testValue);
});
const Employee = require('../lib/Employee');

test ('Can instantiate Employee instance', () => {
    const e = new Employee();
    expect(typeof e).toBe('object');
});

test ('Can set name via constructor arguments', () => {
    const name = 'Tommy';
    const e = new Employee(name);
    expect(e.name).toBe(name);
});

test ('Can set id via constructor arguments', () => {
    const testValue = 100;
    const e = new Employee('Foo', testValue);
    expect(e.id).toBe(testValue);
});

test ('Can set email via constructor arguments', () => {
    const testValue = 'test@gmail.com';
    const e = new Employee('Foo', 1, testValue);
    expect(e.email).toBe(testValue);
});

test ('Can get id via getId', () => {
    const testValue = 100;
    const e = new Employee('Foo', testValue);
    expect(e.getId()).toBe(testValue);
});

test ('Can get email via getEmail', () => {
    const testValue = 'test@gmail.com';
    const e = new Employee('Foo', 1, testValue);
    expect(e.getEmail()).toBe(testValue);
});

test ('Return "Employee" on getRole()', () => {
    const testValue = 'Employee';
    const e = new Employee('Tommy', 1, testValue);
    expect(e.getRole()).toBe(testValue);
});
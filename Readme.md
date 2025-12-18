

# 1) Difference between `var`, `let`, and `const`
- `var` is function-scoped and can be redeclared; `let` is block-scoped and cannot be redeclared in the same scope.  
- `const` is block-scoped and must be initialized; its value cannot be reassigned.


# 2) Difference between `map()`, `forEach()`, and `filter()`
- `map()` returns a new array after applying a function to each element.  
- `forEach()` executes a function on each element but returns `undefined`.  
- `filter()` returns a new array with elements that pass a test condition.


# 3) Arrow functions in ES6
- Arrow functions provide a shorter syntax for writing functions: `(args) => expression`.  
- They do not have their own `this`, making them useful in certain contexts like callbacks.

# 4) Destructuring assignment in ES6
- Destructuring allows unpacking values from arrays or objects into separate variables:  
```javascript
const [a, b] = [1, 2];
const {name, age} = {name: "Alice", age: 25};

#Technical debt

The following are to be changed once it's comfortable to do so.

Construct | Shim | Standard | Conditioned by
--- | --- | --- | ---
`Array.from()` | `_.toArray()` | ECMAScript 6 | Mainstream adoption
`Object.assign()` | `_.assign()` | ECMAScript 2015 | Mainstream adoption
Generators | `--target es6` | ECMAScript 6 | [TypeScript#1564](https://github.com/Microsoft/TypeScript/issues/1564)

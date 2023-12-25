"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/safe-json-utils";
exports.ids = ["vendor-chunks/safe-json-utils"];
exports.modules = {

/***/ "(ssr)/./node_modules/safe-json-utils/dist/cjs/index.js":
/*!********************************************************!*\
  !*** ./node_modules/safe-json-utils/dist/cjs/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction safeJsonParse(value) {\n    if (typeof value !== 'string') {\n        throw new Error(`Cannot safe json parse value of type ${typeof value}`);\n    }\n    try {\n        return JSON.parse(value);\n    }\n    catch (_a) {\n        return value;\n    }\n}\nexports.safeJsonParse = safeJsonParse;\nfunction safeJsonStringify(value) {\n    return typeof value === 'string'\n        ? value\n        : JSON.stringify(value, (key, value) => typeof value === 'undefined' ? null : value);\n}\nexports.safeJsonStringify = safeJsonStringify;\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2FmZS1qc29uLXV0aWxzL2Rpc3QvY2pzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQSxnRUFBZ0UsYUFBYTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvc2FmZS1qc29uLXV0aWxzL2Rpc3QvY2pzL2luZGV4LmpzPzhlOGIiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBzYWZlSnNvblBhcnNlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2FmZSBqc29uIHBhcnNlIHZhbHVlIG9mIHR5cGUgJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLnNhZmVKc29uUGFyc2UgPSBzYWZlSnNvblBhcnNlO1xuZnVuY3Rpb24gc2FmZUpzb25TdHJpbmdpZnkodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogSlNPTi5zdHJpbmdpZnkodmFsdWUsIChrZXksIHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHZhbHVlKTtcbn1cbmV4cG9ydHMuc2FmZUpzb25TdHJpbmdpZnkgPSBzYWZlSnNvblN0cmluZ2lmeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/safe-json-utils/dist/cjs/index.js\n");

/***/ })

};
;
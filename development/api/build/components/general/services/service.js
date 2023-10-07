"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateField = {
    testFields: (name) => {
        const result = name.match(/[0-9A-Za-zÄÖÜäöü -.,!?]/g);
        if (result.length === name.length) {
            return true;
        }
        return false;
    },
    testName: (name) => {
        const result = name.match(/[A-Za-zÄÖÜäöü -]/g);
        if ((result === null || result === void 0 ? void 0 : result.length) === name.length) {
            return true;
        }
        return false;
    },
};
exports.default = validateField;

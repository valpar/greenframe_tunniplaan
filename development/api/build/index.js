"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const app_1 = __importDefault(require("./app"));
const port = 4000;
// Start API
app_1.default.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App is running on port ${port}`);
});

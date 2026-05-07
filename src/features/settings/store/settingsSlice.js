"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTheme = exports.setError = exports.setLoading = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    isLoading: false,
    error: null,
    theme: 'light',
};
var settingsSlice = (0, toolkit_1.createSlice)({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setLoading: function (state, action) {
            state.isLoading = action.payload;
        },
        setError: function (state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setTheme: function (state, action) {
            state.theme = action.payload;
        },
    },
});
exports.setLoading = (_a = settingsSlice.actions, _a.setLoading), exports.setError = _a.setError, exports.setTheme = _a.setTheme;
exports.default = settingsSlice.reducer;

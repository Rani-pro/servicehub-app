"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.setError = exports.setLoading = exports.setUser = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    user: null,
    isLoading: true,
    error: null,
};
var authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: function (state, action) {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: function (state, action) {
            state.isLoading = action.payload;
        },
        setError: function (state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: function (state) {
            state.user = null;
            state.isLoading = false;
        },
    },
});
exports.setUser = (_a = authSlice.actions, _a.setUser), exports.setLoading = _a.setLoading, exports.setError = _a.setError, exports.logout = _a.logout;
exports.default = authSlice.reducer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var authSlice_1 = require("../features/auth/store/authSlice");
var settingsSlice_1 = require("../features/settings/store/settingsSlice");
var notificationSlice_1 = require("../features/notifications/store/notificationSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: authSlice_1.default,
        settings: settingsSlice_1.default,
        notifications: notificationSlice_1.default,
    },
});

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAllNotifications = exports.setNotifications = exports.removeNotification = exports.markAllAsRead = exports.markAsRead = exports.addNotification = exports.setError = exports.setLoading = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
};
var notificationSlice = (0, toolkit_1.createSlice)({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        setLoading: function (state, action) {
            state.isLoading = action.payload;
        },
        setError: function (state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        addNotification: function (state, action) {
            state.notifications.unshift(action.payload);
            if (!action.payload.read) {
                state.unreadCount += 1;
            }
        },
        markAsRead: function (state, action) {
            var notification = state.notifications.find(function (n) { return n.id === action.payload; });
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        markAllAsRead: function (state) {
            state.notifications.forEach(function (notification) {
                notification.read = true;
            });
            state.unreadCount = 0;
        },
        removeNotification: function (state, action) {
            var index = state.notifications.findIndex(function (n) { return n.id === action.payload; });
            if (index !== -1) {
                var notification = state.notifications[index];
                if (!notification.read) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
                state.notifications.splice(index, 1);
            }
        },
        setNotifications: function (state, action) {
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter(function (n) { return !n.read; }).length;
        },
        clearAllNotifications: function (state) {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
});
exports.setLoading = (_a = notificationSlice.actions, _a.setLoading), exports.setError = _a.setError, exports.addNotification = _a.addNotification, exports.markAsRead = _a.markAsRead, exports.markAllAsRead = _a.markAllAsRead, exports.removeNotification = _a.removeNotification, exports.setNotifications = _a.setNotifications, exports.clearAllNotifications = _a.clearAllNotifications;
exports.default = notificationSlice.reducer;

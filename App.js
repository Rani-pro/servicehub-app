"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
require("react-native-gesture-handler");
var react_redux_1 = require("react-redux");
var AppNavigator_1 = require("./src/navigation/AppNavigator");
var store_1 = require("./src/store/store");
function App() {
    return (<react_redux_1.Provider store={store_1.store}>
            <AppNavigator_1.default />
        </react_redux_1.Provider>);
}

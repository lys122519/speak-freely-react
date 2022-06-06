"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var config_1 = require("../../../../../config");
var user_1 = require("../../../../../context/user");
var fetch_1 = require("../../../../../hooks/fetch");
var request_1 = require("../../../../../request");
require("./article_set.less");
var Title = antd_1.Typography.Title, Text = antd_1.Typography.Text;
var ArticleSet = function () {
    var _a = react_1.useState(1), page = _a[0], setPage = _a[1];
    var userinfo = react_1.useContext(user_1.UserContext).userinfo;
    var arts = fetch_1.useFetch({
        path: "/article",
        token: userinfo === null || userinfo === void 0 ? void 0 : userinfo.token
    }, [])[0];
    return (React.createElement(React.Fragment, null,
        React.createElement(antd_1.Card, null,
            React.createElement(antd_1.Segmented, { options: ['全部', '草稿', '已发布'] }),
            React.createElement(antd_1.List, { dataSource: arts, pagination: {
                    position: "bottom",
                    total: 20,
                    pageSize: 6,
                    onChange: function (p) {
                        setPage(p);
                    }
                }, renderItem: function (item) {
                    return (React.createElement("div", { className: "user-admin-article-item", key: item.id },
                        React.createElement(antd_1.Row, { justify: "space-between" },
                            React.createElement(antd_1.Col, null,
                                React.createElement(antd_1.Row, { align: "middle" },
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(antd_1.Tag, { color: "orange" }, "\u8349\u7A3F")),
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(Title, { style: { cursor: "pointer" }, level: 4 }, item.name)))),
                            React.createElement(antd_1.Col, null)),
                        React.createElement(antd_1.Row, null),
                        React.createElement(antd_1.Row, { justify: "space-between" },
                            React.createElement(antd_1.Col, null,
                                React.createElement(antd_1.Row, { gutter: 20 },
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(Text, { style: { color: "#666" } },
                                            React.createElement(icons_1.EyeOutlined, null),
                                            " 0")),
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(Text, { style: { color: "#666" } },
                                            React.createElement(icons_1.LikeOutlined, null),
                                            " 0")),
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(Text, { style: { color: "#666" } },
                                            React.createElement(icons_1.CommentOutlined, null),
                                            " 0")),
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(Text, { style: { color: "#666" } },
                                            React.createElement(icons_1.StarOutlined, null),
                                            " 0")))),
                            React.createElement(antd_1.Col, null,
                                React.createElement(antd_1.Row, { gutter: 10 },
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(react_router_dom_1.Link, { to: "/h/editor/" + item.id },
                                            React.createElement(antd_1.Button, { type: "link", size: "small" }, "\u7F16\u8F91"))),
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(antd_1.Button, { type: "link", size: "small" }, "\u6D4F\u89C8")),
                                    React.createElement(antd_1.Col, null,
                                        React.createElement(DeleteModal, { id: item.id })))))));
                } }))));
};
var DeleteModal = function (props) {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var userinfo = react_1.useContext(user_1.UserContext).userinfo;
    var onDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, request_1["default"]({
                            url: config_1["default"].host + ("/article/" + props.id),
                            method: "DELETE",
                            headers: {
                                token: (_a = userinfo === null || userinfo === void 0 ? void 0 : userinfo.token) !== null && _a !== void 0 ? _a : ""
                            }
                        })];
                case 2:
                    res = _b.sent();
                    if (res.data.code === 200) {
                        antd_1.message.success("操作成功");
                        setVisible(false);
                    }
                    else {
                        antd_1.message.error(res.data.msg);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    console.log(err_1);
                    antd_1.message.error("出现异常，详见控制台");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(antd_1.Button, { type: "link", danger: true, size: "small", onClick: function () { return setVisible(true); } }, "\u5220\u9664"),
        React.createElement(antd_1.Modal, { title: "\u63D0\u793A", onCancel: function () { return setVisible(false); }, footer: (React.createElement(React.Fragment, null,
                React.createElement(antd_1.Button, { onClick: function () { return setVisible(false); } }, "\u53D6\u6D88"),
                React.createElement(antd_1.Button, { type: "primary", loading: loading, onClick: onDelete }, "\u786E\u5B9A"))), visible: visible }, "\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F")));
};
exports["default"] = ArticleSet;

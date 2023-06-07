"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const button = /* @__PURE__ */ vue.defineComponent({
  name: "Button",
  setup() {
    return vue.createVNode("button", {
      "type": "button"
    }, [vue.createTextVNode("按钮")]);
  }
});
exports.default = button;

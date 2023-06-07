import { defineComponent, createVNode, createTextVNode } from "vue";
const button = /* @__PURE__ */ defineComponent({
  name: "Button",
  setup() {
    return createVNode("button", {
      "type": "button"
    }, [createTextVNode("按钮")]);
  }
});
export {
  button as default
};

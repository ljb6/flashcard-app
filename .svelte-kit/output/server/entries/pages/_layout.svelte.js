import { d as bind_props } from "../../chunks/context.js";
function _layout($$payload, $$props) {
  const prerender = true;
  let { children } = $$props;
  children($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { prerender });
}
export {
  _layout as default
};

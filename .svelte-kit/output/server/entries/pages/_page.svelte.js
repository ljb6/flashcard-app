import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
import { c as pop, p as push } from "../../chunks/context.js";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean) return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function _page($$payload, $$props) {
  push();
  let flashcards_qty = 1;
  let flashcards = [];
  let selectedOption = "random";
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center min-h-screen bg-teal-50"><h1 class="text-6xl font-bold text-gray-800 mb-10">FlashApp</h1> <div class="p-8 rounded-3xl shadow-2xl bg-white"><h1 class="text-3xl font-bold text-left mb-6">Configurações</h1> <div class="mt-6"><label for="qtd" class="block text-lg text-gray-700 font-medium mb-2">Quantidade de flashcards</label> <input id="qtd" type="number" min="1"${attr("max", flashcards.length)}${attr("value", flashcards_qty)} class="p-3 w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-gray-50 text-gray-800 text-lg"> <p class="text-gray-500">Flashcards criados: ${escape_html(flashcards.length)}</p></div> <div class="mt-8"><span class="block text-lg text-gray-700 font-medium mb-2">Modo de treino</span> <div class="flexflex-col gap-8"><label class="flex items-center"><input type="radio" name="modo" value="random" class="accent-emerald-500 h-5 w-5" checked${attr("checked", selectedOption === "random", true)}> <span class="ml-3 text-lg text-gray-700">Aleatório</span></label> <label class="flex items-center"><input type="radio" name="modo" value="due" class="accent-emerald-500 h-5 w-5"${attr("checked", selectedOption === "due", true)}> <span class="ml-3 text-lg text-gray-700">Revisão Espaçada</span></label> <label class="flex items-center"><input type="radio" name="modo" value="errors" class="accent-emerald-500 h-5 w-5"${attr("checked", selectedOption === "errors", true)}> <span class="ml-3 text-lg text-gray-700">Foco nos erros</span></label></div></div> <div class="flex flex-col justify-center text-center gap-3 mt-8 max-w-xs mx-auto w-200">`;
    if (flashcards.length == 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button disabled class="bg-red-200 text-red-700 font-medium px-6 py-3 rounded-lg shadow-md">Adicione flashcards para praticar</button>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<button class="w-full cursor-pointer bg-emerald-400 text-emerald-800 hover:bg-emerald-500 hover:text-emerald-9000 font-medium px-6 py-3 rounded-lg transition-colors shadow-md">Praticar</button>`;
    }
    $$payload.out += `<!--]--> <div class="flex gap-3 w-full"><a href="/flashcards" class="flex-1 cursor-pointer bg-emerald-200 text-emerald-700 hover:bg-emerald-300 hover:text-emerald-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md">Flashcards</a></div></div></div></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};

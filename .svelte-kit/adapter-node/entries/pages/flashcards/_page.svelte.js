import { c as pop, p as push, e as ensure_array_like } from "../../../chunks/context.js";
import "clsx";
import "../../../chunks/client.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function CreateFlashcard($$payload, $$props) {
  push();
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function GenerateFlashcards($$payload, $$props) {
  push();
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let flashcards = [];
  const each_array = ensure_array_like(flashcards);
  $$payload.out += `<div class="flex flex-col items-start ml-2 mt-2 p-2"><div class="flex justify-between items-center gap-4 w-full"><div class="flex gap-4"><a href="/" class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md">Voltar</a> <button class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md">Criar</button> <button class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md">Gerar com IA</button> <button class="cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md">Deletar todos</button></div> <h2 class="mr-5 text-xl font-bold">Flashcards: ${escape_html(flashcards.length)}</h2></div></div> <hr class="mt-2 border-emerald-100"> `;
  CreateFlashcard($$payload);
  $$payload.out += `<!----> `;
  GenerateFlashcards($$payload);
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <section class="bg-white p-6 rounded-2xl"><table class="w-full text-left"><thead><tr class="border-b border-gray-300"><th class="pb-4">Frente</th><th class="pb-4">Verso</th><th class="pb-4">Acerto %</th><th class="pb-4"></th></tr></thead><tbody><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let flashcard = each_array[$$index];
    $$payload.out += `<tr class="border-b border-gray-100 group hover:bg-teal-50 transition-colors"><td class="py-3">${escape_html(flashcard.front)}</td><td class="py-3">${escape_html(flashcard.back)}</td>`;
    if (isNaN(flashcard.correct_answers / (flashcard.correct_answers + flashcard.incorrect_answers) * 100)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<td class="py-3">--%</td>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<td class="py-3">${escape_html((flashcard.correct_answers / (flashcard.correct_answers + flashcard.incorrect_answers) * 100).toFixed(2))}%</td>`;
    }
    $$payload.out += `<!--]--><td class="py-3 text-right"><div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button class="cursor-pointer px-3 py-1" title="Editar">✏️</button> <button class="cursor-pointer px-3 py-1" title="Deletar">🗑️</button></div></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></section>`;
  pop();
}
export {
  _page as default
};

<script>
    import { createFlashcard, generateFlashcards } from "$lib/api";

    let { open, onClose } = $props();
    let theme = $state("");

    async function handleFlashcardCreation() {
        open = false;
        const response = await generateFlashcards(theme);
        console.log(response);
        if (response == 200) {
            window.location.reload();
        } else {
            alert("Erro!");
        }
    }
</script>

{#if open}
    <div
        class="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50"
    >
        <div class="bg-teal-50 p-8 rounded-lg shadow-2xl shadow-emerald-700 min-w-[320px]">
            <h2 class="text-lg font-bold mb-4 text-emerald-700">
                Gerar Flashcards
            </h2>
            <form>
                <input
                    class="border border-emerald-200 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white text-gray-800"
                    placeholder="Tema"
                    bind:value={theme}
                />
                <button
                    type="button"
                    onclick={handleFlashcardCreation}
                    class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-2 rounded-lg transition-colors shadow-md mr-2"
                    >Gerar</button
                >
                <button
                    type="button"
                    class="cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-2 rounded-lg transition-colors shadow-md"
                    onclick={onClose}>Cancelar</button
                >
            </form>
        </div>
    </div>
{/if}

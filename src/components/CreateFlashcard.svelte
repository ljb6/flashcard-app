<script>
    import { createFlashcard } from "$lib/api";

    let { open, onClose } = $props();
    let front = $state("");
    let back = $state("");

    async function handleFlashcardCreation() {
        const response = await createFlashcard(front, back);
        console.log(response);
        if (response == 200) {
            onClose();
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
        <div class="bg-teal-50 p-8 rounded-lg shadow-lg min-w-[320px]">
            <h2 class="text-lg font-bold mb-4 text-emerald-700">
                Criar Flashcard
            </h2>
            <form>
                <input
                    class="border border-emerald-200 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white text-gray-800"
                    placeholder="Frente"
                    bind:value={front}
                />
                <input
                    class="border border-emerald-200 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white text-gray-800"
                    placeholder="Verso"
                    bind:value={back}
                />
                <button
                    type="button"
                    onclick={handleFlashcardCreation}
                    class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-2 rounded-lg transition-colors shadow-md mr-2"
                    >Salvar</button
                >
                <button
                    type="button"
                    class="cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-2 rounded-lg transition-colors shadow-md"
                    onclick={onClose}>Fechar</button
                >
            </form>
        </div>
    </div>
{/if}

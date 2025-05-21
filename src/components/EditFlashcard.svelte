<script>
    import { goto } from "$app/navigation";
    import { editFlashcard } from "$lib/api";

    let { open, onClose, id, frontPh, backPh } = $props();
    let front = $state(frontPh);
    let back = $state(backPh);

    async function handleFlashcardEdition() {
        const response = await editFlashcard(id, front, back);
        console.log(response);
        if (response == 200) {
            onClose();
            goto("/").then(() => goto("/flashcards"));
        } else {
            alert("Erro!");
        }
    }
</script>

{#if open}
    <div
        class="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50"
    >
        <div class="bg-blue-50 p-8 rounded-lg shadow-lg min-w-[320px]">
            <h2 class="text-lg font-bold mb-4 text-blue-700">
                Editar Flashcard
            </h2>
            <form>
                <input
                    class="border border-blue-200 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Frente"
                    bind:value={front}
                />
                <input
                    class="border border-blue-200 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Verso"
                    bind:value={back}
                />
                <button
                    onclick={handleFlashcardEdition}
                    class="cursor-pointer bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 font-medium px-6 py-2 rounded-lg transition-colors shadow-md mr-2"
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

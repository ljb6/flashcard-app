<script lang="ts">
    import { onMount } from "svelte";
    import CreateFlashcard from "../../components/CreateFlashcard.svelte";
    import { deleteAllFlashcards, deleteFlashcard, getFlashcards } from "$lib/api";
    import EditFlashcard from "../../components/EditFlashcard.svelte";

    type Flashcard = {
        ID: number;
        Front: string;
        Back: string;
    };

    let showCreateFlashcardPopup = $state();
    let showEditFlashcardPopup = $state();

    let flashcards: Flashcard[] = $state([]);
    onMount(async () => {
        try {
            flashcards = await getFlashcards();
        } catch (error) {
            console.error(error);
        }
    });

    async function handleFlashcardDelete(id: number) {
        const response = await deleteFlashcard(id);
        flashcards = flashcards.filter((flashcard) => flashcard.ID !== id);
    }

    let editingFlashcard: Flashcard | null = $state(null);
    function handleFlashcardEditClick(flashcard: Flashcard) {
        editingFlashcard = flashcard;
        showEditFlashcardPopup = true;
    }

    async function handleDeleteAllFlashcards() {
        const response = await deleteAllFlashcards();
        console.log(response);
        window.location.reload();
    }
</script>

<div class="flex flex-col items-start ml-2 mt-2 bg-white p-2">
    <div class="flex justify-between items-center gap-4 w-full">
        <div class="flex gap-4">
            <a
                href="/"
                class="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
                >Praticar</a
            >
            <button
                onclick={() => (showCreateFlashcardPopup = true)}
                class="cursor-pointer bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
                >Criar</button
            >
            <button
                onclick={handleDeleteAllFlashcards}
                class="cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
                >Deletar todos</button
            >
        </div>
        <h2 class="mr-5 text-xl">Flashcards: {flashcards.length}</h2>
    </div>
</div>
<hr class="mt-2 border-blue-100" />

<!--Popups para editar/criar-->
<CreateFlashcard
    open={showCreateFlashcardPopup}
    onClose={() => (showCreateFlashcardPopup = false)}
/>

{#if editingFlashcard}
    <EditFlashcard
        open={showEditFlashcardPopup}
        onClose={() => {
            showEditFlashcardPopup = false;
            editingFlashcard = null;
        }}
        frontPh={editingFlashcard.Front}
        backPh={editingFlashcard.Back}
        id={editingFlashcard.ID}
    />
{/if}

<section class="bg-white p-6 rounded-2xl">
    <table class="w-full text-left">
        <thead>
            <tr class="border-b border-[#E0E0E0]">
                <th class="pb-4">Frente</th>
                <th class="pb-4">Verso</th>
                <th class="pb-4"></th>
            </tr>
        </thead>
        <tbody>
            {#each flashcards as flashcard}
                <tr
                    class="border-b border-[#F0F0F0] group hover:bg-blue-50 transition-colors"
                >
                    <td class="py-3">{flashcard.Front}</td>
                    <td class="py-3">{flashcard.Back}</td>
                    <td class="py-3 text-right">
                        <div
                            class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <button
                                onclick={() =>
                                    handleFlashcardEditClick(flashcard)}
                                class="cursor-pointer px-3 py-1"
                                title="Editar"
                            >
                                ✏️
                            </button>
                            <button
                                onclick={() =>
                                    handleFlashcardDelete(flashcard.ID)}
                                class="cursor-pointer px-3 py-1"
                                title="Deletar"
                            >
                                🗑️
                            </button>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

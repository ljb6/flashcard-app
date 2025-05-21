<script>
    import CreateFlashcard from "../../components/CreateFlashcard.svelte";
    let showCreateFlashcardPopup = false;
</script>

<div class="flex flex-col items-start ml-2 mt-2 bg-white p-2">
    <div class="flex justify-center gap-4">
        <a
            href="/"
            class="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
            >Praticar</a
        >
        <button
            onclick={() => (showCreateFlashcardPopup = true)}
            class="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
            >Criar</button
        >
        <a
            href="/"
            class="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
            >Deletar todos</a
        >
    </div>
</div>
<hr class="mt-2 border-blue-100" />

<CreateFlashcard
    open={showCreateFlashcardPopup}
    onClose={() => (showCreateFlashcardPopup = false)}
/>

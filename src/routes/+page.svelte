<script lang="ts">
    import { getFlashcards } from "$lib/api";
    import { onMount } from "svelte";

    type Flashcard = {
        ID: number;
        Front: string;
        Back: string;
    };

    let flashcards: Flashcard[] = $state([]);
    onMount(async () => {
        try {
            flashcards = await getFlashcards();
        } catch (error) {
            console.error(error);
        }
    });

    let selectedOption = $state("aleatorio");
    let flashcardQty = $state(1);

    function onChange(event: Event) {
        selectedOption = (event.currentTarget as HTMLInputElement).value;
    }

    function handleSubmit() {
        console.log(flashcardQty);
        console.log(selectedOption);
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-teal-50">
    <h1 class="text-6xl font-bold text-gray-800 mb-10">FlashApp</h1>

    <div class="p-8 rounded-3xl shadow-2xl bg-white">
        <h1 class="text-3xl font-bold text-left mb-6">Configurações</h1>

        <div class="mt-6">
            <label
                for="qtd"
                class="block text-lg text-gray-700 font-medium mb-2"
                >Quantidade de flashcards (máx. {flashcards.length})</label
            >
            <input
                id="qtd"
                type="number"
                min="1"
                max={flashcards.length}
                bind:value={flashcardQty}
                class="p-3 w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-gray-50 text-gray-800 text-lg"
            />
        </div>

        <div class="mt-8">
            <span class="block text-lg text-gray-700 font-medium mb-2"
                >Modo de treino</span
            >
            <div class="flexflex-col gap-8">
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="modo"
                        value="aleatorio"
                        class="accent-emerald-500 h-5 w-5"
                        checked
                        bind:group={selectedOption}
                    />
                    <span class="ml-3 text-lg text-gray-700">Aleatório</span>
                </label>
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="modo"
                        value="erros"
                        class="accent-emerald-500 h-5 w-5"
                        bind:group={selectedOption}
                    />
                    <span class="ml-3 text-lg text-gray-700"
                        >Foco nos erros</span
                    >
                </label>
            </div>
        </div>

        <div class="flex flex-col justify-center text-center gap-3 mt-8">
            <button
                onclick={handleSubmit}
                class="cursor-pointer text-emerald-600 hover:text-emerald-800 font-medium px-8 py-4 rounded-xl hover:bg-emerald-100 transition-colors shadow-md text-lg"
                >Praticar</button
            >
            <div class="flex gap-3">
                <a
                    href="/flashcards"
                    class="text-emerald-600 hover:text-emerald-800 font-medium px-8 py-4 rounded-xl hover:bg-emerald-100 transition-colors shadow-md text-lg"
                    >Flashcards</a
                >
                <a
                    href="/flashcards"
                    class="text-emerald-600 hover:text-emerald-800 font-medium px-8 py-4 rounded-xl hover:bg-emerald-100 transition-colors shadow-md text-lg"
                    >Resultados</a
                >
            </div>
        </div>
    </div>
</div>

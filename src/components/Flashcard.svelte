<script lang="ts">
    import { getFlashcards } from "$lib/api";
    import { onMount } from "svelte";

    let flashcardsQty = $props();

    type Flashcard = {
        ID: number;
        Front: string;
        Back: string;
    };

    let loading = $state(true);
    let loadingError: string | null = $state(null);

    let flashcards: Flashcard[] = $state([]);
    onMount(async () => {
        try {
            flashcards = await getFlashcards();
        } catch (error: any) {
            loadingError = error;
            console.error(error);
        } finally {
            loading = false;
        }
    });

    function shuffleFlashcards(x: number): Flashcard[] {
        return [...flashcards].sort(() => Math.random() - 0.5).slice(0, x);
    }

    flashcards = shuffleFlashcards(5);

    let showAnswer = $state();
    let step = $state(0);

    async function increaseStep() {
        if (step < flashcards.length - 1) {
            showAnswer = !showAnswer;
            // timeout para não mostrar rapidamente a próxima resposta antes de terminar a animação
            await new Promise((resolve) => setTimeout(resolve, 140));
            step++;
        }
    }

    function handleFlashcard() {
        showAnswer = !showAnswer;
    }
    let hoveredButton: "none" | "wrong" | "right" = $state("none");
</script>

{#if loading}
    <h2>Carregando flashcards..</h2>
{:else if loadingError}
    <h2>ss</h2>
{:else if flashcards.length == 0}
    <h2>Você ainda nao adicionou flashcards</h2>
{:else}
    <div class="flex flex-col min-h-screen">
        <!-- Espaço do topo até o contador -->
        <div class="flex-1 flex flex-col justify-end pb-8">
            <div class="flex justify-center">
                <h1 class="text-4xl font-semibold">
                    {step + 1} / {flashcards.length}
                </h1>
            </div>
        </div>

        <div class="flex-[2] flex items-start justify-center">
            <div class="flex items-center justify-center">
                {#if showAnswer}
                    <button
                        onclick={increaseStep}
                        class="mr-20 text-9xl cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200 font-bold p-2"
                        aria-label="Errado"
                        onmouseenter={() => (hoveredButton = "wrong")}
                        onmouseleave={() => (hoveredButton = "none")}
                    >
                        ✕
                    </button>
                {/if}

                <div class="perspective flex justify-center cursor-pointer">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="flashcard w-80 aspect-square rounded-xl shadow-lg cursor-pointer transition-transform duration-500"
                        class:flipped={showAnswer}
                        onclick={handleFlashcard}
                    >
                        <div
                            class="front absolute w-full h-full flex items-center justify-center bg-white rounded-xl border-2 border-gray-200 backface-hidden p-6"
                        >
                            <p class="text-2xl font-semibold text-gray-800">
                                {flashcards[step].Front}
                            </p>
                        </div>
                        <div
                            class="border-2 shadow-2xl back absolute w-full h-full flex items-center justify-center bg-teal-50 rounded-xl backface-hidden rotate-y-180 p-6
              {hoveredButton === 'wrong'
                                ? ' border-red-500'
                                : hoveredButton === 'right'
                                  ? ' border-green-500'
                                  : ' border-gray-200'}"
                        >
                            <p class="text-2xl font-semibold text-gray-800">
                                {flashcards[step].Back}
                            </p>
                        </div>
                    </div>
                </div>

                {#if showAnswer}
                    <button
                        onclick={increaseStep}
                        class="ml-21 text-8xl cursor-pointer text-gray-400 hover:text-green-500 transition-colors duration-200 font-bold p-2"
                        aria-label="Certo"
                        onmouseenter={() => (hoveredButton = "right")}
                        onmouseleave={() => (hoveredButton = "none")}
                    >
                        ✓
                    </button>
                {/if}
            </div>
        </div>
        <a href="/" class="ml-4 mb-4 cursor-pointer">Interromper</a>
    </div>
{/if}

<style>
    .perspective {
        perspective: 1000px;
    }
    .flashcard {
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.5s;
    }
    .flashcard .front,
    .flashcard .back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
    }
    .flashcard .back {
        transform: rotateY(180deg);
    }
    .flipped {
        transform: rotateY(180deg);
    }
</style>

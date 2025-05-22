<script lang="ts">
    import {
        getDueFlashcards,
        getFlashcardsByError,
        getRandomFlashcards,
        updateFlashcard,
    } from "$lib/api";
    import { onMount } from "svelte";
    import { Confetti } from "svelte-confetti";

    let { flashcardsQty, trainType } = $props();

    type Flashcard = {
        id: number;
        front: string;
        back: string;
    };

    let loading = $state(true);
    let loadingError: string | null = $state(null);

    let flashcards: Flashcard[] = $state([]);
    let nullDue: boolean = $state(false);
    onMount(async () => {
        try {
            if (trainType == "due") {
                flashcards = await getDueFlashcards();
                if (flashcards == null) nullDue = true;
            } else if (trainType == "random") {
                flashcards = await getRandomFlashcards(flashcardsQty);
            } else if (trainType == "errors") {
                flashcards = await getFlashcardsByError(flashcardsQty);
            }
        } catch (error: any) {
            loadingError = error;
            console.error(error);
        } finally {
            loading = false;
        }
    });

    let showAnswer = $state();
    let step = $state(0);

    function handleFlashcard() {
        showAnswer = !showAnswer;
    }

    let correctAnswers = $state(0);
    let correctAnswersIDs = $state<number[]>([]);
    let wrongAnswersIDs = $state<number[]>([]);

    async function increaseStep(correctAnswer: boolean, id: number) {
        if (step < flashcards.length) {
            updateFlashcard(id, correctAnswer);
            if (correctAnswer) {
                correctAnswers++;
                correctAnswersIDs.push(id);
            } else {
                wrongAnswersIDs.push(id);
            }
            showAnswer = !showAnswer;
            // timeout para não mostrar rapidamente a próxima resposta antes de terminar a animação
            await new Promise((resolve) => setTimeout(resolve, 140));
            step++;
        }
    }

    function handleRemake() {
        correctAnswers = 0;
        correctAnswersIDs = [];
        step = 0;
    }

    let hoveredButton: "none" | "wrong" | "right" = $state("none");
</script>

{#if loading}
    <div class="flex items-center justify-center min-h-screen">
        <div
            class="animate-spin rounded-full h-32 w-32 border-t-4 border-emerald-500 border-solid"
        ></div>
    </div>
{:else if loadingError}
    <h2>loading error</h2>
{:else if nullDue}
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
            Nenhum flashcard pendente para revisão espaçada!
        </h2>
        <button
            onclick={() => window.location.reload()}
            class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
            >Voltar</button
        >
    </div>
{:else if step < flashcards.length}
    <div class="flex flex-col min-h-screen">
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
                        onclick={() => increaseStep(false, flashcards[step].id)}
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
                            class="front absolut text-center w-full h-full flex items-center justify-center bg-white rounded-xl border-2 border-gray-200 backface-hidden p-6"
                        >
                            <p class="text-2xl font-semibold text-gray-800">
                                {flashcards[step].front}
                            </p>
                        </div>
                        <div
                            class="border-2 shadow-2xl back absolute text-center w-full h-full flex items-center justify-center bg-gray-100 rounded-xl backface-hidden rotate-y-180 p-6
              {hoveredButton === 'wrong'
                                ? ' border-red-500 bg-red-200 shadow-2xl transition-colors duration-300'
                                : hoveredButton === 'right'
                                  ? ' border-green-500 bg-green-200 shadow-2xl transition-colors duration-300'
                                  : ' border-gray-200 transition-colors duration-300'}"
                        >
                            <p class="text-2xl font-semibold text-gray-800">
                                {flashcards[step].back}
                            </p>
                        </div>
                    </div>
                </div>

                {#if showAnswer}
                    <button
                        onclick={() => increaseStep(true, flashcards[step].id)}
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
        <div class="mb-8 ml-4">
            <button
                onclick={() => window.location.reload()}
                class="cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
                >Interromper</button
            >
        </div>
    </div>
{/if}

<!--Resultado-->
{#if step >= flashcards.length && flashcards.length > 0}
    {#if correctAnswers / flashcards.length >= 0.7}
        <div
            style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
        >
            <Confetti
                x={[-5, 5]}
                y={[0, 0.1]}
                delay={[500, 2000]}
                infinite
                duration={5000}
                amount={300}
                fallDistance="100vh"
            />
        </div>
    {/if}
    <div>
        <div class="flex mt-4 ml-4 gap-2">
            <button
                onclick={() => window.location.reload()}
                class="cursor-pointer bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
                >Voltar</button
            >
            <button
                onclick={handleRemake}
                class="cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
                >Refazer</button
            >
        </div>
        <div class="flex justify-start ml-7">
            <h1 class="text-2xl font-bold mt-8">
                Acertos {correctAnswers}/{flashcards.length}
            </h1>
        </div>
        <div class="bg-white p-6 rounded-2xl">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-gray-300">
                        <th class="pb-4">Frente</th>
                        <th class="pb-4">Verso</th>
                    </tr>
                </thead>
                <tbody>
                    {#each flashcards as flashcard}
                        {#if correctAnswersIDs.some((item) => item === flashcard.id)}
                            <tr class="border-b border-gray-100">
                                <td class="py-3 ml-2">✅ {flashcard.front}</td>
                                <td class="py-3">{flashcard.back}</td>
                            </tr>
                        {:else}
                            <tr class="border-b border-gray-100">
                                <td class="py-3 ml2">❌ {flashcard.front}</td>
                                <td class="py-3">{flashcard.back}</td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
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

    .animate-spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

<script>
    let { front, back } = $props();
    let showAnswer = $state();
    function handleFlashcard() {
        showAnswer = !showAnswer;
    }
</script>

<div class="perspective">
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
                {front}
            </p>
        </div>
        <div
            class="back absolute w-full h-full flex items-center justify-center bg-teal-50 rounded-xl border-2 border-emerald-400 backface-hidden rotate-y-180 p-6"
        >
            <p class="text-2xl font-semibold text-emerald-600">{back}</p>
        </div>
    </div>
</div>

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
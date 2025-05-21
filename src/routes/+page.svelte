<div class="flex flex-col items-center justify-center min-h-screen bg-teal-50">
    <h1 class="text-5xl font-bold text-gray-800 mb-8">FlashApp</h1>

    <div class="p-6 rounded-2xl shadow-lg bg-white">
        <h1 class="text-2xl font-bold text-gray-800 text-left">Configuração</h1>

        <div class="mt-4">
            <label for="qtd" class="block text-gray-700 font-medium"
                >Quantidade de flashcards</label
            >
            <input
                id="qtd"
                type="number"
                min="1"
                max="100"
                value="10"
                class="p-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-gray-50 text-gray-800"
            />
        </div>

        <div class="mt-4">
            <span class="block text-gray-700 font-medium">Modo de treino</span>
            <div class="flexflex-col gap-6">
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="modo"
                        value="aleatorio"
                        class="accent-emerald-500"
                        checked
                    />
                    <span class="ml-2 text-gray-700">Aleatório</span>
                </label>
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="modo"
                        value="erros"
                        class="accent-emerald-500"
                    />
                    <span class="ml-2 text-gray-700">Foco nos erros</span>
                </label>
            </div>
        </div>

        <div class="flex flex-col justify-center text-center gap-2 mt-4">
            <a
                href="/flashcards"
                class="text-emerald-600 hover:text-emerald-800 font-medium px-6 py-3 rounded-lg hover:bg-emerald-100 transition-colors shadow-md"
                >Começar</a
            >
            <div class="flex gap-2">
                <a
                    href="/flashcards"
                    class="text-emerald-600 hover:text-emerald-800 font-medium px-6 py-3 rounded-lg hover:bg-emerald-100 transition-colors shadow-md"
                    >Flashcards</a
                >
                <a
                    href="/flashcards"
                    class="text-emerald-600 hover:text-emerald-800 font-medium px-6 py-3 rounded-lg hover:bg-emerald-100 transition-colors shadow-md"
                    >Resultados</a
                >
            </div>
        </div>
    </div>
</div>

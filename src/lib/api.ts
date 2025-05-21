export async function createFlashcard(front: string, back: string) {
    const resp = await fetch("http://localhost:8080/flashcards/create-flashcard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ front, back })
    })
    
    return resp.status;
}

export async function getFlashcards() {
    const res = await fetch("http://localhost:8080/flashcards/get-flashcards", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch flashcards');
    }

    //console.log(res);

    const data = await res.json();
    console.log(data);
    return data;
}
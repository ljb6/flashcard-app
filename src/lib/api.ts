export async function createFlashcard(front: string, back: string) {
    const resp = await fetch("http://localhost:8080/flashcards/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ front, back })
    })

    return resp.status;
}

export async function getFlashcards() {
    const res = await fetch("http://localhost:8080/flashcards/get", {
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

export async function deleteFlashcard(id: number) {
    const resp = await fetch("http://localhost:8080/flashcards/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
    })

    return resp.status;
}

export async function editFlashcard(id: number, front: string, back: string) {
    const resp = await fetch("http://localhost:8080/flashcards/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, front, back })
    })

    return resp.status;
}
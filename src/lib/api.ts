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

export async function getFlashcards(req_type: string, quantity: number) {
    const res = await fetch("http://localhost:8080/flashcards/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ req_type, quantity })
    });

    if (!res.ok) {
        console.log(res);
        throw new Error('Failed to fetch flashcards');
    }

    //console.log(res);

    const data = await res.json();

    console.log("data: ", data);

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

export async function deleteAllFlashcards() {
    const resp = await fetch("http://localhost:8080/flashcards/deleteall", {
        method: "POST",
    })

    return resp.status;
}

export async function updateFlashcard(id: number, correct: boolean) {
    const resp = await fetch("http://localhost:8080/flashcards/update-stats", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, correct })
    })

    return resp.status;
}

export async function getDueFlashcards() {
    const res = await fetch("http://localhost:8080/flashcards/get-due", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        console.log(res);
        throw new Error('Failed to fetch flashcards');
    }

    //console.log(res);

    const data = await res.json();

    console.log("data: ", data);

    return data;
}
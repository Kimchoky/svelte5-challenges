interface Todo {
    id: string,
    content: string,
    done: boolean,
    order: number,
    xDragging: string,
    style: string = '',
    state?: 'confirm' | '' | null,
}
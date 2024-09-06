interface Todo {
    id: string,
    content: string,
    done: boolean,
    order: number,
    style: string = '',
    state?: 'confirm' | '' | null,
}
interface Tool {
    name: 'Pencil'|'Eraser';
}

interface Work {
    tool: Tool,
    state: Object,
}

interface State {
    tool: Tool,
    history: Array<Work>
}
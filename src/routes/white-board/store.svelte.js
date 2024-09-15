/** @type { State } */
const state = $state({
    tool: {
        name: 'Pencil',
    },
    history: [],
});

/** @type { HTMLElement|null } */
let canvas = $state(null);

export default {
    state,
    canvas,
}
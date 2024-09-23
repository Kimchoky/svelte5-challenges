/** @type { DevelopProgress } */
export default {
    features: [
        {done: true, content: 'Area for the drawing'},
        {done: true, content: 'Toolbar with different drawing tools (pen, eraser, shapes)'},
        {done: true, content: 'Use Svelte runes to manage the application state'},
    ],
    optionals: [
        {done: true, content: 'Undo/Redo functionality'},
        {done: true, content: 'Color picker for selecting drawing color'},
        {done: false, content: 'Save/Load: Allow users to save their drawings and load them later'},
        {done: false, content: 'Collaboration: Implement real-time collaboration using a WebSocket connection'},
        {done: false, content: 'Responsive design: Make the whiteboard work well on different screen sizes'},
    ],
    otherHtml: `
    `,
}
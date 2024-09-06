import { writable } from "svelte/store";

let picoTheme = writable('light');

export { picoTheme };

// export default function () {

//     let picoTheme = $state('');

//     return {
//         /** @type { ()=>string } */
//         get theme() { return picoTheme },
        
//         /** @param {string} theme  */
//         set theme(theme) { picoTheme = theme },
//     }

// }
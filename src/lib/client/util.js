
/** @param {string} src  */
export function preload(src) {
    return new Promise(function (resolve, reject) {
        let img = new Image();
        img.onerror = reject;
        img.onload = resolve;
        img.src = src;
    })
}
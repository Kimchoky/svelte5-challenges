function setPencil() {
    document.head.style.cursor = 'nowAllowed !important';
}

function setEraser() {
    console.log('eraser');
    document.head.style.cursor = 'pointer !important';
}

function unset() {
    console.log('unset');
    document.head.style.cursor = 'unset';
}


export default {
    setPencil,
    setEraser,
    unset,
}
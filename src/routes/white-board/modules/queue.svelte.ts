
//-- queue things 
let queue: Array<QueueItem> = $state([]);
let cursor: number = $state(-1);
export function getActionQueue() {
    function setQueueCursor(index: number) {
        index = Math.min(queue.length - 1, index);
        cursor = Math.max(-1, index);
    }
    function increaseQueueCursor() {
        cursor = Math.min(queue.length - 1, cursor + 1);
    }
    function decreaseQueueCursor() {
        cursor = Math.max(-1, cursor - 1);
    }
    function spliceAfterCursor() {
        queue.splice(cursor + 1);
    }
    function pushItem(ta: QueueItem) {
        queue.push(ta);
    }
    function pushItems(tas: Array<QueueItem>) {
        tas.forEach(ta => queue.push(ta));
    }
    return {
        get cursor() { return cursor; },
        get queue() { return queue; },
        setQueueCursor,
        increaseQueueCursor,
        decreaseQueueCursor,
        pushItem,
        pushItems,
        spliceAfterCursor,
    }
}


//-- exports

const LOCAL_STORAGE_ITEM_ID = 'white-board:gallery';

function queueItemToJson(queueItem: QueueItem) {
    return {
        drawingToolName: queueItem.drawingTool.name,
        actions: queueItem.actions,
    }
}

function jsonToQueueItem(str: string) {

}


function load(): Array<Gallery> {

    const s = localStorage.getItem(LOCAL_STORAGE_ITEM_ID);
    console.log('load s', s)

    if (!s) return [];

    try {
        const json = JSON.parse(s);
        return json;
    }
    catch (e) {
        return [];
    }

}

function save(queueItem: Array<QueueItem>) {
    
    console.log('saving', queueItem.length);
    if (queueItem.length === 0) {
        console.warn("Nothing to save");
        return;
    }

    const array = queueItem.map(qi => ({
        drawingToolName: qi.drawingTool.name,
        actions: qi.actions,
    }));
    
    const s = JSON.stringify([...load(), array]);
    localStorage.setItem(LOCAL_STORAGE_ITEM_ID, s);
}

function remove(index: number) {
    const arr = load();
    arr.splice(index, 1);
    const s = JSON.stringify(arr);
    localStorage.setItem(LOCAL_STORAGE_ITEM_ID, s);

}

export default {
    load,
    save,
    remove,
}
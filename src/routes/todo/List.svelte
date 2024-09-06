<script>
    import { fade, slide } from "svelte/transition";

    /** @type {{ title: string, todos: Array<Todo>, draggingItem: Todo|null, done: boolean, onToggleComplete: function, onDeleteItem: function, onSwapItems: function }}*/
    let { title, todos=$bindable(), draggingItem=$bindable(), done, onToggleComplete, onDeleteItem, onSwapItems } = $props();
    const localTodos = $derived(todos.filter(v => v.done === done));

    let listOpen = $state(true);

    /** @param { DragEvent & { currentTarget: Element } } e
        @param { string } id */
    function handleDragStart(e, id) {
        resetAllState();
        const todo = todos.find(v=>v.id === id);
        if (!todo || !e.dataTransfer) return;
        
        draggingItem = todo;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', id);

        // hide browser default drag image (shadowed element)
        e.dataTransfer.setDragImage(e.currentTarget, window.outerWidth, window.outerHeight);
    }

    /** @param { DragEvent & { currentTarget: EventTarget & HTMLLIElement } } e
     *  @param { string } id
     */
    function handleDragEnter(e, id) {
        e.preventDefault();
        if (draggingItem?.id === id || draggingItem?.done !== done) return;
        
        onSwapItems(draggingItem.id, id);
    }

    /** @param { DragEvent & { currentTarget: EventTarget & HTMLElement; } } event */
    function handleDragEnterOnUl(event) {
        if (draggingItem?.done === done) return;   // indicates that action performed in same section

        listOpen = true;        
        onToggleComplete(draggingItem?.id);
    }

    /** @param { DragEvent & { currentTarget: EventTarget & HTMLLIElement; } } e
        @param { string } id */
    function handleDragOver(e, id) {
        e.preventDefault(); // to NOT display curosr to 'not-allowed'
    }

    /** @param {DragEvent} e
        @param {string} id */
    function handleDragEnd(e, id) {
        draggingItem = null;
    }

    /** @param {DragEvent} e */
    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer?.getData('text');
        const item = todos.find(v=>v.id === id);

        if (!item || item.done === done) return;

        onToggleComplete(id);
    }


    /** @param { string } id */
    function confirmDelete(id) {
        const index = todos.findIndex(v => v.id === id);
        if (todos[index].state === 'confirm')
            onDeleteItem(id)
        else {
            resetAllState();
            todos[index].state = 'confirm';
        }
    }

    function resetAllState() {
        todos.forEach(d => d.state = null);
    }
   
</script>
<section ondrop={handleDrop} ondragenter={handleDragEnterOnUl} role="directory">
    <div class="x-flex-row">
        <h2>{title}</h2>
        <div>
            {#if listOpen}
            <button class="x-transparent" onclick={()=>listOpen = false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.55.55 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.55.55 0 0 0-.771 0" />
                </svg>
            </button>
            {:else}
            <button class="x-transparent" onclick={()=>listOpen = true}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                    <path fill="currentColor" d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.55.55 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.55.55 0 0 1 0-.771" />
                </svg>
            </button>
            {/if}
        </div>
    </div>

    <div class="grid">
        {#if listOpen}
        <ul class="x-todo-items x-completed" transition:slide >
        {#each localTodos as todo (todo.id)}
            <li 
                ondragstart={e=>handleDragStart(e, todo.id)}
                ondragenter={e=>handleDragEnter(e, todo.id)}
                ondragover={e=>handleDragOver(e, todo.id)}
                ondragend={e=>handleDragEnd(e, todo.id)} 
                style={todo.style}
                draggable="true"
                transition:slide
                >
                <div class="x-todo-item" class:x-dragging={draggingItem?.id === todo.id}>
                    <div>
                        <input type="checkbox" onclick={()=>onToggleComplete(todo.id)} checked={todo.done}/>
                    </div>
                    <div class="x-todo-item-content">
                        <div>{todo.content}</div>
                    </div>
                    <div class="x-delete-area">
                        <button onclick={()=>confirmDelete(todo.id)} class:confirm={todo.state === 'confirm'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
        {/each}
        </ul>
        {/if}
    </div>
</section>

<style lang="scss">

    .grid {
        grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    }

    .x-todo-items {
        padding: 0;
        margin-bottom: 2rem;
        position: relative;

        li {
            list-style: none;
            cursor: move;
        }
    }

    .x-todo-item {
        width: 100%;
        border: 1px solid light-dark(var(--pico-primary), var(--pico-secondary));
        background-color: light-dark(lightgray, gray) ;
        height: 4rem;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem .5rem;
        
        div.x-todo-item-content {
            flex-grow: 1;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
        }

    }

    .x-dragging {
        transform: scale(1.02);
        background-color: light-dark(rgb(233, 233, 233), dimgray );
    }

    .x-delete-area button {
        color: currentColor;
        border: 0;
        background-color: transparent;

        &.confirm {
            background-color: rgb(218, 95, 95);

            &::after {
                content: 'Delete?';
                font-size: .8rem;
                padding-left: .5rem;
            }
        }
    }

    ul {
        min-height: 3rem;
    }
</style>
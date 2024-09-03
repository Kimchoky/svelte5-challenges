<script>
    import { browser } from "$app/environment";
    import { flip } from "svelte/animate";
    import Item from "./Item.svelte";
    import { onMount } from "svelte";
    import DevelopProgress from "./DevelopProgress.svelte";


    const storedTodos = browser && localStorage.getItem('todo:todos') || '[]';

    let newContent = $state('');
    let isSwitching = false;

    /** @type { Array<Todo> }*/
    let todos = $state(JSON.parse(storedTodos) || []);
    
    let absolutes = $state(false);

    $effect(() => {
        localStorage.setItem('todo:todos', JSON.stringify(todos));
    })

    function turnAbsolutes() {
        if (!absolutes) return;
        /** @type { NodeListOf<HTMLLIElement> } */
        const lis = document.querySelectorAll('.x-todo-items li')
        lis.forEach((el, i) => {
            const style = `top: ${el.offsetTop}px`;
            todos[i] = { ...todos[i], style};

            console.log(todos[i]);
        });
    }

    /** @type { number|null }*/
    let draggingIndex = null;
    
    

    /** @param { KeyboardEvent } e */
    function handleKeypress(e) {
        if (e.key === 'Enter') 
            addTodo();
    }

    function addTodo() {
        const id = window.crypto.randomUUID();
        /** @type { Todo }*/
        const todo = {
            id,
            content: newContent,
            done: false,
            order: todos.length + 1,
            xDragging: '',
            style: '',
        };
        todos = [...todos, todo];
        newContent = '';

        todos.forEach((d, i) => {
            d.state = null;
        });
    }

    let dragging = $state({
        top: 0, left: 0,
    });

    /** @param { DragEvent } e
     *  @param { number } index
     */
    function handleDragEnter(e, index) {
        if (draggingIndex == null || index === draggingIndex) return;
        //if (isSwitching) return;
        console.log('enter', index);
        
        isSwitching = true;

        const currentTodo = todos[draggingIndex];
        todos[draggingIndex] = todos[index];
        todos[index] = currentTodo;

        todos = todos;

    }

    /** @param {DragEvent} e
        @param {number} index */
    function handleDragStart(e, index) {
        draggingIndex = index;
        /** @type { HTMLLIElement } */
        todos[index] = { ... todos[index], xDragging: 'x-dragging' };

        e.dataTransfer?.setData('text/plain', ''+index);

        // hide browser default drag image (shadowed element)
        e.dataTransfer?.setDragImage(e.target, window.outerWidth, window.outerHeight);


    }

    /** @param {DragEvent} e
        @param {number} index */
    function handleDragEnd(e, index) {
        draggingIndex = null;
        isSwitching = false;
        
        console.log('drag end ', index, e.dataTransfer?.getData('text'));
        /** @type { HTMLLIElement } */
        todos[index] = { ... todos[index], xDragging: '' };
    }

    /** @param { DragEvent } e
     *  @param { number } index
     */
    function handleDrag(e, index) {
        // console.log(e)
    }

    /** @param { DragEvent } e
     *  @param { number } index
     */
    function handleDragOver(e, index) {
        //if (index === draggingIndex) return;
        console.log(`over: draggingIndex=${draggingIndex}, overIndex=${index}, ${e.dataTransfer.getData('text')}`);
    }

    /** @param { MouseEvent & { currentTarget: EventTarget & Window } } e */
    function onMouseMove(e) {
        dragging = { ...dragging, top: e.pageY, left: e.pageX }
    }

    /** @param {number} index */
    function handleCompleteItem(index) {
        todos[index].done = true;
    }
    /** @param {number} index */
    function handleDeleteItem(index) {
        if (todos[index].state === 'confirm')
            todos = [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)];
        else {
            todos.forEach((d, i) => {
                d.state = (i === index) ? 'confirm' : null;
            });
        }
    }

    onMount(()=>{
        turnAbsolutes();
    });
</script>

<svelte:body onmousemove={onMouseMove} />

<DevelopProgress />

<h1>TODO App</h1>

<div class="x-new-todo">
    <input type="text" onkeypress={handleKeypress} bind:value={newContent} placeholder="Something to do...">
    <button onclick={addTodo}>Add</button>
</div>

<div class="grid">
    <ul class="x-todo-items {absolutes?'x-absolutes':''}"
        style="--x-dragging-top: {dragging.top}; --x-dragging-left: {dragging.left};">
    {#each todos as todo, index (todo.id)}
        <li animate:flip
            ondragenter={e=>handleDragEnter(e, index)}
            ondragstart={e=>handleDragStart(e, index)}
            ondrag={e=>handleDrag(e, index)}
            ondragover={e=>handleDragOver(e, index)}
            ondragend={e=>handleDragEnd(e, index)} 
            style={todo.style}
            >
            <div class="x-todo-item {todo.xDragging}" draggable="true">
                <div>
                    <input type="checkbox" onclick={()=>handleCompleteItem(index)} checked={todo.done}/>
                </div>
                <div class="x-todo-item-content">
                    <div>{todo.content}</div>
                </div>
                <div>
                    <button onclick={()=>handleDeleteItem(index)} class={todo.state}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
                <!-- <div style="display: inline-block">
                    #{todo.order} / {todo.xDragging} / {todo.style} / {todo.id}
                </div> -->
            </div>
        </li>
    {/each}
    </ul>
</div>

<div>
    
</div>


<style lang="scss">

    button.confirm {
        background-color: red;
    }

    .x-new-todo {
        display: flex;
        align-items: center;
        gap: 1rem;

        input {
            margin: 0;
        }
    }

    .grid {
        grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    }

    .x-todo-items {
        padding: 2rem 0;
        position: relative;

        li {
            list-style: none;
        }
    }

    .x-absolutes li {
        position: absolute;
    }
    
    .x-todo-item {
        width: 100%;
        border: 1px solid var(--pico-primary);
        background-color: bisque;
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
        // position: absolute;
        // visibility: hidden;
        background-color: red;
        // top: var(--x-dragging-top)px;
        // left: var(--x-dragging-left)px;
    }
</style>
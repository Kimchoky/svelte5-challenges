<script>
    import { browser } from "$app/environment";
    import { flip } from "svelte/animate";
    import Item from "./Item.svelte";
    import { onMount } from "svelte";


    const storedTodos = browser && localStorage.getItem('todos') || '[]';

    let newContent = $state('');
    let isSwitching = false;

    /** @type { Array<Todo> }*/
    let todos = $state(JSON.parse(storedTodos) || []);
    
    let absolutes = $state(false);

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
            order: todos.length + 1,
            xDragging: '',
            style: '',
        };
        todos = [...todos, todo]
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


    onMount(()=>{
        addTodo();addTodo();addTodo();

        turnAbsolutes();
    });
</script>

<svelte:body onmousemove={onMouseMove} />

<details>
    <summary>Implementation progress</summary>
    <h6>Features</h6>
    <ul>
        <li><input type="checkbox" disabled checked >Add new todos</li>
        <li><input type="checkbox" disabled >Mark todos as completed</li>
        <li><input type="checkbox" disabled >Delete todos</li>
        <li><input type="checkbox" disabled >Display a list of todos</li>
        <li><input type="checkbox" disabled >Svelte 5 runes for state management</li>
    </ul>
    <h6>Optional Features</h6>
    <ul>
        <li><input type="checkbox" disabled >Drag and drop: Reordering todos</li>
        <li><input type="checkbox" disabled >Storage: <code>localStorage</code></li>
        <li><input type="checkbox" disabled >Service workers: Cache app for offline funcionality</li>
    </ul>
</details>

<hr/>

<h1>TODO App</h1>

<div class="x-new-todo">
    <input type="text" onkeypress={handleKeypress} bind:value={newContent}>
    <button onclick={addTodo}>Add</button>
</div>
Dragging[{draggingIndex}]
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
                <div>{todo.content}</div>
                <div style="display: inline-block">
                    #{todo.order} / {todo.xDragging} / {todo.style} / {todo.id}
                </div>
            </div>
        </li>
    {/each}
    </ul>
</div>

<div>
    
</div>


<style lang="scss">
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
    }

    .x-dragging {
        // position: absolute;
        // visibility: hidden;
        background-color: red;
        // top: var(--x-dragging-top)px;
        // left: var(--x-dragging-left)px;
    }
</style>
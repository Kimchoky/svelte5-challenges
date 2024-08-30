<script>
    import { browser } from "$app/environment";
    import { flip } from "svelte/animate";
    import Item from "./Item.svelte";
    import { onMount } from "svelte";


    const storedTodos = browser && localStorage.getItem('todos') || '[]';

    /** @type { Array<Todo> }*/
    let todos = $state(JSON.parse(storedTodos) || []);

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
            order: todos.length + 1,
        };
        todos = [...todos, todo]
    }

    /** @param { DragEvent } e */
    function handleDragEnter(e) {
        const rootEl = e.__root ?? e.target;
        
        console.log('root', rootEl, e.toElement);
        
    }

    onMount(()=>{
        addTodo();addTodo();addTodo();
    });
</script>

<details>
    <summary>Implementation progress</summary>
    <h6>Features</h6>
    <ul>
        <li><input type="checkbox" disabled >Add new todos</li>
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
    <input type="text" onkeypress={addTodo}>
    <button onclick={addTodo}>Add</button>
</div>


<div class="grid">
    <ul class="x-todo-item">
    {#each todos as todo, index (todo.id)}
        <li draggable="true" animate:flip ondragenter={handleDragEnter}>
            <div style="display: inline-block">
                #{todo.order}
            </div>
            <div>
                ({todo.id})
            </div>
        </li>
    {/each}
    </ul>
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

    ul.x-todo-item {
        padding: 2rem 0;

        li {
            list-style: none;
            border: 1px solid var(--pico-primary);

            .x-flip-from {
        
            }
            .x-flip-to {
                border-style: dashed;
            }
        }
    }
</style>
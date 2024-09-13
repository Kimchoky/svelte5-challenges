<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import DevelopProgress from '$lib/components/DevelopProgress.svelte';
    import developProgressData from './DevelopProgress'
    import List from "./List.svelte";


    const storedTodos = browser && localStorage.getItem('todo:todos') || '[]';

    let newContent = $state('');

    /** @type { Array<Todo> }*/
    let todos = $state(JSON.parse(storedTodos) || []);
    /** @type { Todo|null } */
    let draggingItem = $state(null);
    
    $effect(() => {
        const storeTodos = todos.map(v => ({
            ...v,
            xDragging: '',
            style: '',
        }));
        localStorage.setItem('todo:todos', JSON.stringify(storeTodos));
    })


    /** @param { KeyboardEvent } e */
    function handleKeypress(e) {
        if (e.key === 'Enter') 
            addTodo();
    }

    function addTodo() {
        if (!(''+newContent).trim()) return;
        const id = window.crypto.randomUUID();
        /** @type { Todo }*/
        const todo = {
            id,
            content: newContent,
            done: false,
            order: todos.length + 1,
            style: '',
        };
        todos.push(todo);
        newContent = '';
    }

     /** @param { string } id */
     function handleToggleComplete(id) {
        const index = todos.findIndex(v=>v.id === id);
        todos[index].done = !todos[index].done;
    }
    /** @param { string } id */
    function handleDeleteItem(id) {
        todos = todos.filter(v => v.id !== id);
    }

    /** @type { (draggingId: string, targetId: string)=>void }*/
    function handleSwapItems(draggingId, targetId) {
        const draggingIndex = todos.findIndex(v=>v.id === draggingId);
        const targetIndex = todos.findIndex(v=>v.id === targetId);
        
         // swap items
         const currentTodo = todos[draggingIndex];
        todos[draggingIndex] = todos[targetIndex];
        todos[targetIndex] = currentTodo;
    }

    onMount(()=>{
        if ('serviceWorker' in navigator) {
	        // addEventListener('load', function () {
		    //     navigator.serviceWorker.register('/todo/service-worker.js');
	        // });
        } 

    });
</script>

<DevelopProgress data={developProgressData} />

<h1>TODO App</h1>

<div class="x-new-todo">
    <input type="text" onkeypress={handleKeypress} bind:value={newContent} placeholder="Something to do...">
    <button onclick={addTodo}>Add</button>
</div>

<hr>

<List title="Todo"
    bind:draggingItem 
    bind:todos
    done={false}
    onToggleComplete={handleToggleComplete}
    onDeleteItem={handleDeleteItem}
    onSwapItems={handleSwapItems} />

<List title="Completed"
    bind:draggingItem 
    bind:todos
    done={true}
    onToggleComplete={handleToggleComplete}
    onDeleteItem={handleDeleteItem}
    onSwapItems={handleSwapItems} 
    />


<style lang="scss">

    .x-new-todo {
        display: flex;
        align-items: center;
        gap: 1rem;

        input {
            margin: 0;
        }
    }


</style>
<script>
    
    /** @type { {data: DevelopProgress} }*/
    let { data } = $props();

</script>

<details>
    <summary>Implementation progress</summary>
    <h6>Features</h6>
    <ul>
        {#each data.features as feature}
            <li><input type="checkbox" disabled checked={feature.done}>{feature.content}</li>
        {/each}
    </ul>
    
    {#if data.optionals}
    <h6>Optional Features</h6>
    <ul>
        {#each data.optionals as optional}
            <li><input type="checkbox" disabled checked={optional.done}>{optional.content}</li>
        {/each}
    </ul>
    {/if}

    {@html data.otherHtml}
</details>

<hr/>

<style>
    li {
        list-style: none;   
    }
</style>
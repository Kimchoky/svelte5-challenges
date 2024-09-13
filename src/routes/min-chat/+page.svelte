<script>
    import DevelopProgress from "$lib/components/DevelopProgress.svelte";
    import { onMount } from "svelte";
    import dvelopProgressData from "./DevelopProgress";

    /** @type { Array<ChatMessage> }*/
    let messages = $state([]);

    const f = (msg, me)=>({id:me?'me':'you', userId:'a', userName:'someone', text:msg, timestamp: new Date().getTime(), notice: false});
    function generateRandomStringWithSpaces(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '; // 알파벳과 공백 포함
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex]; // 랜덤한 알파벳 또는 공백 추가
        }

        return result;
    }

    onMount(()=>{
        const t = setInterval(()=>{
            messages.push(f(generateRandomStringWithSpaces(60)))
            if (messages.length > 20) clearInterval(t);
        }, 200)
        const tt = setInterval(()=>{
            messages.push(f(generateRandomStringWithSpaces(50), true))
            if (messages.length > 20) clearInterval(tt);
        }, 200)
    })

</script>

<DevelopProgress data={dvelopProgressData} />

<div class="x-wrapper">
    <div class="x-chat">
        {#each messages as message}
        <div class="x-message" class:x-sent={message.id==='me'}><div class="x-content">{message.text}</div></div>    
        {/each}
    </div>
    <div class="x-input-box">
        Mesage here
    </div>
</div>

<style lang="scss">
    .x-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .x-chat {
            .x-message {
                display: flex;
                padding: .2rem 1rem;
                justify-content: flex-start;

                .x-content {
                    border: 1px currentColor solid;
                    border-radius: 4px;
                    padding: .5rem;
                }
            }

            .x-sent {
                justify-content: flex-end;
                .x-content {
                    background-color: lightblue;
                }
            }

            
            
        }
    }
</style>
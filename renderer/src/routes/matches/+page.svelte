<script lang="ts">

    import Button from '$lib/Button.svelte';


    const a = window.electronAPI


    async function fetchMatchHistories() {

        const a = window.electronAPI
        console.log('typeof el', typeof a)

        const matchHistory = await window.electronAPI.requestLolMatchHistory()
        console.log(matchHistory)
    }
</script>


<div class="container h-full mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center">
        <button class="btn btn-sm variant-filled">Sync Match</button>

        <h2 class="h2">wa</h2>
        <!-- Animated Logo -->
        uni
        <Button onClick={fetchMatchHistories}>

            wa

        </Button>


    </div>

</div>
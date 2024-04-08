<script context="module" lang="ts">

</script>


<script lang="ts">

  onMount(async () => {
    const matchHistory = await window.electronAPI.requestLolMatchHistory();
    // 試合IDに基づいて個々の試合詳細を取得
    const gameDetails = await Promise.all(
      matchHistory.games.games.map((game) =>
        window.electronAPI.requestLolMatch(game.gameId.toString())
      )
    );

    return {
      props: {
        matchHistory,
        gameDetails,
      },
    };
  });
  export let matchDetails;
</script>

<div>
  unira

</div>
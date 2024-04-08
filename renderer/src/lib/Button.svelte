<script>
  export let label = 'Click me'; // 外部からラベルを受け取れるようにする
  export let onClick = () => { };
</script>


<button
  class="flex items-center justify-center px-4 py-2 bg-primary-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 ease-in-out"
  on:click={onClick}>
  <slot></slot>
</button>

<style>
  /* 必要に応じてさらにスタイルを追加 */
</style>
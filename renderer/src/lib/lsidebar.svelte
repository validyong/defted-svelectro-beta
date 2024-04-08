<script lang="ts">
    import { isPackaged } from '../store/generalStore'

    export let label = 'Click me'; // 外部からラベルを受け取れるようにする
    // ここでJavaScriptを使って動的なデータを扱うこともできます
</script>

<div class="bg-gray-800 text-white p-4">
    <ul>
        <li><a href="/" class="block py-2">Home</a></li>
        <li><a href="/matches" class="block py-2">Matches</a></li>
        <!-- 他のリンクもここに追加 -->
        {#if !$isPackaged}
        <li><a href="/matches" class="block py-2">Dev</a></li>

        {/if}
    </ul>
</div>
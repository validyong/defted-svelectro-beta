<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import Button from '$lib/Button.svelte';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	async function handleButtonClick() {
		alert('ボタンがクリックされたよ！');

		try {
			const response = await window.electronAPI.refreshLoLAuth();
			if (response.success) {
				console.log(`Updated port: ${response.port}, token: ${response.token}`);
				alert(`Updated port: ${response.port}, token: ${response.token}`);
				// ここで必要に応じてUIを更新
			} else {
				console.error('Failed to refresh LoL auth:', response.error);
				alert(`Failed to refresh LoL auth: ${response.error}`);
			}
		} catch (error) {
			console.error('Error calling refreshLoLAuth:', error);
			alert(`Error calling refreshLoLAuth: ${error}`);
		}
	}

	onMount(() => {
		if (window.electronAPI) {
			console.log(window.electronAPI);
			window.electronAPI.onRefreshLoLAuthResponse((response) => {
				// ここにコールバック処理を記述
			});
		} else {
			console.error('electronAPI is not available');
		}
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Defted Svelectro</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Button label="クリックしてね" onClick={handleButtonClick} />
				<a class="btn btn-sm variant-ghost-surface" href="https://discord.gg/EXqV7W8MtY" target="_blank"
					rel="noreferrer">
					Discord
				</a>
				<a class="btn btn-sm variant-ghost-surface" href="https://twitter.com/SkeletonUI" target="_blank"
					rel="noreferrer">
					Twitter
				</a>
				<a class="btn btn-sm variant-ghost-surface" href="https://github.com/skeletonlabs/skeleton"
					target="_blank" rel="noreferrer">
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
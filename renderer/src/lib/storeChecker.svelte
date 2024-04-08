<script lang="ts">
	import { writable, get, type Writable, derived } from 'svelte/store'

	import {
		popup,
		TreeView,
		RecursiveTreeView,
		type TreeViewNode,
		type PopupSettings
	} from '@skeletonlabs/skeleton'

	import {
		count,
		isPackaged,
		deftedGuilds,
		selectedGuild,
		selectedGuildMembers,
		meAsGuildMember,
		isSignedin
	} from '$store/generalStore'
	import { onMount } from 'svelte'

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	}

	// デモ用のオブジェクト
	let demoObject = {
		xxxStore: {
			xxxAaa: true,
			xxxBbb: '1',
			xxxCcc: {
				xxxCccL: 123,
				xxxCccK: 'abc',
				bbb: ['a', 'c', 'd']
			}
		},
		yyyStore: {
			yyyAaa: 123
		}
	}

	const stores = derived(
		[
			count,
			isPackaged,
			deftedGuilds,
			selectedGuild,
			selectedGuildMembers,
			meAsGuildMember,
			isSignedin
		],
		([
			$count,
			$isPackaged,
			$deftedGuilds,
			$selectedGuild,
			$selectedGuildMembers,
			$meAsGuildMember,
			$isSignedin
		]) => ({
			generalStore: {
				count: $count,
				isPackaged: $isPackaged,
				deftedGuilds: $deftedGuilds,
				selectedGuild: $selectedGuild,
				selectedGuildMembers: $selectedGuildMembers,
				meAsGuildMember: $meAsGuildMember,
				isSignedin: $isSignedin
			}
		})
	)

	let expandedNodes = writable<string[]>([])

	interface TreeViewNode {
		id: string
		content: string
		children?: TreeViewNode[]
	}

	function convertToTreeViewNodes(obj: Record<string, any>, parentId: string = ''): TreeViewNode[] {
		return Object.entries(obj).map(([key, value]) => {
			const nodeId = `${parentId}${parentId ? '.' : ''}${key}`
			let content = `${key}: `

			if (typeof value === 'object' && value !== null) {
				const childPreview = Object.entries(value)
					.map(([k, v]) => (typeof v === 'object' ? `${k}: {...}` : `${k}: ${v}`))
					.join(', ')
				content += `{ ${childPreview} }`
			} else {
				content += value
			}

			return {
				id: nodeId,
				content,
				children:
					typeof value === 'object' && value !== null
						? convertToTreeViewNodes(value, nodeId)
						: undefined
			}
		})
	}

	function truncateString(str: string | object, maxLength: number): string {
		if (typeof str === 'string') {
			return str.length > maxLength ? str.substring(0, maxLength) + '…' : str
		} else {
			return str.toString()
		}
	}

	let nodes = derived(expandedNodes, ($expandedNodes) => convertToTreeViewNodes($stores))

	function handleToggle(event: CustomEvent) {
		const { id } = event.detail
		expandedNodes.update((current) =>
			current.includes(id) ? current.filter((e) => e !== id) : [...current, id]
		)
	}

	nodes.subscribe((current) => {})

	expandedNodes.subscribe((current) => {})

	onMount(() => {})
</script>

<!-- 開発者ツールのポップアップを表示するボタン -->

<button class="btn btn-sm variant-filled" use:popup={popupFeatured}>dev</button>

<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
	<div><p>Demo Content</p></div>
	<div class="arrow bg-surface-100-800-token" />
	<RecursiveTreeView
		nodes={$nodes}
		on:toggle={handleToggle}
		expandedNodes={$expandedNodes}
		padding="py-0"
	/>
</div>

<style lang="postcss">
	.string {
		color: aqua;
	}
	.number {
		color: purple;
	}
	.boolean {
		color: red;
	}
</style>

<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import { faDiscord } from '@fortawesome/free-brands-svg-icons'
	import Fa from 'svelte-fa'
	import { writable, get } from 'svelte/store'

	import {
		Button,
		Modal,
		Tooltip,
		Dropdown,
		DropdownItem,
		Avatar,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte'
	let defaultModal = false
	import { isPackaged } from '../store/generalStore'
	import { CodeBlock } from '@skeletonlabs/skeleton'
	import hljs from 'highlight.js/lib/core'
	import markdown from 'highlight.js/lib/languages/markdown'
	import { isSignedin, selectedGuild } from '$store/generalStore'

	hljs.registerLanguage('markdown', markdown)

	async function signIn() {
		// Electronの環境で実行されているかをチェック

		let apiBaseUrl
		if (get(isPackaged)) {
			apiBaseUrl = import.meta.env.VITE_DEV_API_BASE_URL
		} else {
			apiBaseUrl = import.meta.env.VITE_LOCAL_API_BASE_URL
		}

		console.log('basurl', apiBaseUrl)
		if (window.electronAPI) {
			// window.location.href = `${apiBaseUrl}/api/auth/discord-sv`;
			await window.electronAPI.openExternal(`${apiBaseUrl}/api/auth/discord-sv`)
		} else {
			// Web環境であれば、通常のウェイでリダイレクト
			window.location.href = `${apiBaseUrl}/api/auth/discord-sv`
		}
	}

	async function signInAsUser() {
		let apiBaseUrl
		console.log('isp', get(isPackaged))
		if (get(isPackaged)) {
			apiBaseUrl = import.meta.env.VITE_DEV_API_BASE_URL
		} else {
			apiBaseUrl = import.meta.env.VITE_LOCAL_API_BASE_URL
		}

		console.log('basurl', apiBaseUrl)
		if (window.electronAPI) {
			// window.location.href = `${apiBaseUrl}/api/auth/discord-sv`;
			await window.electronAPI.openExternal(`${apiBaseUrl}/api/auth/discord-user-sv`)
		} else {
			// Web環境であれば、通常のウェイでリダイレクト
			window.location.href = `${apiBaseUrl}/api/auth/discord-sv`
		}
	}

	const basicDiscordInfo = `* id
* username
* accentColor
* avatarDecoration
* displayName
* discriminator
* avatar   
* banner
* globalName`
</script>

<button class="btn btn-sm variant-filled" on:click={() => (defaultModal = true)}>
	<Fa icon={faDiscord} class="pr-1" />
	sign in
</button>

{#if $isSignedin}
	<Button pill color="light" id="avatar_with_name" class="!p-1">
		<Avatar src="/images/profile-picture-3.webp" class="me-2" />
		Bonnie Green
	</Button>
	<Dropdown triggeredBy="#avatar_with_name">
		<div slot="header" class="px-4 py-2">
			<span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
			<span class="block truncate text-sm font-medium">name@flowbite.com</span>
		</div>
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownItem>Earnings</DropdownItem>
		<DropdownItem slot="footer">Sign out</DropdownItem>
	</Dropdown>
{/if}

<Modal
	title="Sign in with Discord"
	bind:open={defaultModal}
	autoclose
	backdropClass="bg-opacity-29"
>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Discord OAuth2 allows you to sign in to Defted.
	</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Once signed in, you can view LoL information, match data, etc., of members of the Discord Guild
		to which the Defted Bot has been added.
	</p>
	<p id="hover" class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Defted stores your basic Discord information in a database.
	</p>
	<Tooltip triggeredBy="#hover">
		<span class="underline decoration-dotted cursor-help">basic Discord information</span>
		<CodeBlock language="markdown" code={basicDiscordInfo}></CodeBlock>
	</Tooltip>
	<svelte:fragment slot="footer">
		<!-- <Button on:click={() => alert('Handle "success"')}>I accept</Button> -->
		<Button on:click={() => signIn()}>sign in as a guild manager</Button>
		<Button on:click={() => signInAsUser()}>sign in as a general guild member</Button>
		<Button color="alternative">Decline</Button>
	</svelte:fragment>
</Modal>

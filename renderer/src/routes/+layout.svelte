<script lang="ts">
	import { onMount } from 'svelte'
	import '../app.postcss'
	import { initializeStores } from '@skeletonlabs/skeleton'

	import { AppShell, AppBar } from '@skeletonlabs/skeleton'

	import { storePopup } from '@skeletonlabs/skeleton'

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'

	import Fa from 'svelte-fa'
	import { faFlag } from '@fortawesome/free-solid-svg-icons'
	import { faDiscord } from '@fortawesome/free-brands-svg-icons'

	import { writable, get } from 'svelte/store'
	import { isPackaged, deftedGuilds, isSignedin } from '../store/generalStore'
	import Cookies from 'js-cookie'

	import { initJwtToken } from '../api/authApi'

	// import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from 'fontawesome-svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
	initializeStores()

	// Highlight JS
	import hljs from 'highlight.js/lib/core'
	import 'highlight.js/styles/github-dark.css'
	import { storeHighlightJs } from '@skeletonlabs/skeleton'
	import xml from 'highlight.js/lib/languages/xml' // for HTML
	import css from 'highlight.js/lib/languages/css'
	import javascript from 'highlight.js/lib/languages/javascript'
	import typescript from 'highlight.js/lib/languages/typescript'
	import Button from '$lib/Button.svelte'
	import Lsidebar from '$lib/lsidebar.svelte'
	import StoreChecker from '$lib/storeChecker.svelte'
	import SigninSet from '$lib/signinSet.svelte'
	import { fetchMyDeftedGuilds } from '$api/discordApi'

	hljs.registerLanguage('xml', xml) // for HTML
	hljs.registerLanguage('css', css)
	hljs.registerLanguage('javascript', javascript)
	hljs.registerLanguage('typescript', typescript)
	storeHighlightJs.set(hljs)

	// Floating UI for Popups

	let localApiBaseUrl = import.meta.env.VITE_LOCAL_API_BASE_URL
	async function handleButtonClick() {
		try {
			const unic = await window.electronAPI.getCookies(localApiBaseUrl)

			console.log('url', localApiBaseUrl)
			console.log('uni', unic)
			const response = await window.electronAPI.refreshLoLAuth()

			if (response.success) {
				console.log(`Updated port: ${response.port}, token: ${response.token}`)
				alert(`Updated port: ${response.port}, token: ${response.token}`)
				// ここで必要に応じてUIを更新
			} else {
				console.error('Failed to refresh LoL auth:')
				alert(`Failed to refresh LoL auth: ${response}`)
			}
		} catch (error) {
			console.error('Error calling refreshLoLAuth:', error)
			alert(`Error calling refreshLoLAuth: ${error}`)
		}
	}

	onMount(async () => {
		isPackaged.set(await window.electronAPI.getIsPackaged())

		if (window.electronAPI) {
			const { jwtToken, tokenExpiresAt, signinType, refreshToken } =
				await window.electronAPI.getAuthData()

			Cookies.set('jwtAccessToken', jwtToken)
			Cookies.set('tokenExpiresAt', tokenExpiresAt)
			Cookies.set('signinType', signinType)
			Cookies.set('refreshToken', refreshToken)

			const jot = Cookies.get('jwtAccessToken')
			console.log('jwt', jot)
			if (jwtToken) {
				deftedGuilds.set(await fetchMyDeftedGuilds())
				isSignedin.set(!!jwtToken)
			}
		} else {
			console.error('electronAPI is not available')
		}
	})

	async function runSomme() {
		await initJwtToken()

		console.log('a')
		console.log('isPackaged', get(isPackaged))

		// console.log('onp ', await window.electronAPI.onProtocolData())
		// console.log('proto', await window.electronAPI.getCustomProtocolData())
		console.log('punyonpen punyonpen, ', await window.electronAPI.getAuthData())

		// window.electronAPI.onProtocolData((data:) => {
		// 	console.log('Received data:', data)
		// 	// ここでjwtTokenとsigninTypeを使用
		// })

		// window.electronAPI.getCustomProtocolData().then((data) => {
		// 	console.log('data: ', data) // { jwtToken: "...", signinType: "..." }

		// 	const { jwtToken, tokenExpiresAt, signinType } = data
		// 	console.log(jwtToken)
		// 	// 必要な処理をここで実行
		// })
	}
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
				{#if !$isPackaged}
					<StoreChecker />
					<Button label="Sign in" onClick={runSomme}>aa</Button>
				{/if}
				<SigninSet />

				<Button label="クリックしてね" onClick={handleButtonClick}>Refresh LoL</Button>

				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/validyong/defted-svelectro"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Lsidebar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

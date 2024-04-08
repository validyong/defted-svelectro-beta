<script lang="ts">
	import { Bar } from 'svelte-chartjs'
	import type { ChartData, ChartOptions } from 'chart.js'

	// LCUのAPIから取得したデータを想定
	let gameData = [
		{ gameCreationDate: '2023-01-01', kills: 10 },
		{ gameCreationDate: '2023-01-02', kills: 7 },
		{ gameCreationDate: '2023-01-03', kills: 13 }
		// その他のデータ...
	]

	// Chart.jsの設定
	let data: ChartData = {
		labels: gameData.map((game) => game.gameCreationDate),
		datasets: [
			{
				label: 'キル数',
				data: gameData.map((game) => game.kills),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}
		]
	}

	let options: ChartOptions = {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
</script>

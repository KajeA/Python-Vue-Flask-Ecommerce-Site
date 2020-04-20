<template>
	<article class="order-complete">
		<div>
			<h1>Thanks for renting {{ this.book }}</h1>
			<router-link to="/books" class="button return">Back</router-link>
		</div>
	</article>
</template>

<script>
import axios from 'axios';

const GAMESAPI = 'https://threebranches.hopto.org';

export default {
	data() {
		return {
			book: '',
		};
	},
	methods: {
		getChargeInfo() {
			const path = `${GAMESAPI}/charge/${this.$route.params.id}`;
			axios.get(path)
				.then((response) => {
					this.book = response.data.charge.description;
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error);
				});
		},
	},
	created() {
		this.getChargeInfo();
	},
};
</script>

<style scoped>
	.order-complete {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		margin-top: 60px;
		padding: 10px 20px;
		width: 400px;
		height: 400px;
		background: var(--spiritstone-red);
		background: linear-gradient(180deg, rgba(239,85,44, 1) 0%, rgba(247,189,52,1) 100%);
		background-clip: padding-box;
		border-radius: 15px;
		border: 1px outset var(--spiritsone-red);
		color: var(--abbadon-black);
	}

	.order-complete > div > h1 {
		margin: 2rem auto;
	}

	.button {
	display: block;
	flex-grow: 1;
	margin: .5rem auto;
	padding: .5rem;
	width: 15ch;
	font-size: 14px;
	border: none;
	border-radius: 15px;
	background: rgba(0, 0, 0, 0.4);
	cursor: pointer;
	transition: all .2s ease-in;
}

	.return {
	box-sizing: border-box;
	/* display: block; */
	text-decoration: none;
	color: var(--abbadon-black);
}

.return:hover {
	background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

</style>

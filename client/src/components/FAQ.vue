<template>
	<main>
		<h1>FAQ</h1>
		<p>This is the FAQ page</p>
		<section class="questions">
			<h3>Q: How do we deliver the product?</h3>
			<p>A: We either have an employee drive it to you or we hire someone else.</p>
			<h3>Q: When would I receive my game?</h3>
			<p>A: You'll get it when you get it.</p>
			<h3>Q: What do I do when I return my game?</h3>
			<p>A: Clean that shit fucker!</p>
			<h3>Q: How can I pay?</h3>
			<p>A: With money.</p>
			<h3>Q: Who's in charge of the delivery process?</h3>
			<p>A: We as a company are.</p>
		</section>
	</main>
</template>


<script>

export default {
	name: 'FAQ',
};

</script>

<style>
.questions {
	background-color: antiquewhite;
	position: fixed;
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	border-radius: 30px;
	width: 600px;
	padding: 20px 20px;
	top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
h3 {
	color: rgb(66, 71, 62);
	font-size: 1.4em;
	text-align: start;
}
.questions p {
	color: rgb(37, 41, 34);
	margin-left: 1em;
	font-size: 1.2em;
	text-align: start;
}
@media screen and (max-width: 800px){
	.questions {
		font-size: .8em;
		padding: 10px 10px;
		width: 478px;
	}
@media screen and (max-width: 500px) {
	.questions {
		font-size: .8em;
		padding: 20px 20px;
		width: 400px;
	}
}
}
</style>

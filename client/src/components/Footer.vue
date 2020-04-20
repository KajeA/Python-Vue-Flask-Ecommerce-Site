<template>
	<div class="footer">
		<div class="smicons">
			<i class="fab fa-youtube"></i>
			<i class="fab fa-twitter-square"></i>
			<i class="fab fa-facebook-square"></i>
			<i class="fab fa-wordpress"></i>
		</div>
    	<p>Copyright 2020 The Sentry Box - Site Development by The Bönor City Boys</p>
	</div>
</template>

<style scoped>
.footer {
	height: 5.5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
  background-color: black;
  background-color: var(--abbadon);
  color: var(--averland-sunset);
  text-align: center;

}
.smicons {
	font-size: 1.6rem;
	display: flex;
	justify-content: center;
	padding-top: 0.5rem;
	margin-bottom: .6em;
}

.fab {
	margin-left: 1em;
	margin-right: 1em;
	transition: .1s ease;
	-moz-transition: .1s ease;
	-o-transition: .1s ease;
	-webkit-transition: .1s ease;
}

.fab:hover {
	cursor: pointer;
	color: rgb(146, 146, 13);
	transform: scale(1.2);
}


@media screen and (max-width: 800px) {
	.smicons {
		font-size: 1.7rem;
	}
	.fab:hover {
		cursor: text;
		transform: scale(1);
	}
	p {
		font-size: .8rem;
	}
}
</style>

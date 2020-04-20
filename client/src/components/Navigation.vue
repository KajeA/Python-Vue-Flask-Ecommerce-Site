<template>
	<div>
  		<h2></h2>
 				<nav class="navbar">
					<img src="../assets/sboxlogo.png" class="sblogo" alt="sentry box logo">
    			<router-link class="navlinks" v-for="routes in links"
							v-bind:key="routes.id"
							:to="`${routes.page}`">{{routes.text}}</router-link>
					<input type="text" class="search" placeholder="Search...">
  			</nav>
	</div>
</template>


<script>

export default {
	name: 'Navigation',
	data() {
  		return {
    		links: [
      	{
         		id: 0,
         		text: 'Home',
         		page: '/',
				},
				      	{
         		id: 1,
         		text: 'FAQ',
         		page: '/faq',
				},
				      	{
         		id: 2,
         		text: 'Events',
         		page: '/events',
				},
				      	{
         		id: 3,
         		text: 'About',
         		page: '/about',
				},
				{
         		id: 4,
         		text: 'Rent/Buy',
         		page: '/books',
				},
			],
		};
	},
};
</script>

<style scoped>
.navbar {
	height: 4.2rem;
	width: 100%;
	position: relative;
  left: 0;
	top: 0;
  width: 100%;
	background-color: var(--abbadon-black);
	display: flex;
	justify-content: space-between;
	align-items: center;

}
::placeholder {
	padding-left: 1rem;
}
.sblogo {
    width: 15rem;
    height: 5rem;
    overflow: hidden;
}
.sblogo:hover{
	cursor: pointer;
}
.navlinks {
	font-size: 1.3em;
	color: var(--averland-sunset);
	text-decoration: none;
	justify-content: space-between;
}
.navlinks:hover{
	cursor: pointer;
	color: rgb(146, 146, 13);
}
.search {
	height: 1.5rem;
	width: 9rem;
	border-radius: 20px;
	margin-right: 1rem;
	background-color: var(--averland-sunsetvar(--averland-sunset));
	padding: 1em;
	color: var(--averland-sunset);
	border-bottom: 5px inset var(--averland-sunset);
	border-left: 5px inset var(--averland-sunset);
	outline-color: rgba(0,0,0,0);
}

</style>

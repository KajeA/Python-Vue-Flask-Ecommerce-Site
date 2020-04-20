<template>
	<section class="order-container">
		<header>
			<h1>Ready to rent?</h1>
		</header>
		<router-link to="/books" class="button return">Back</router-link>
		<article>
			<!-- Note to self: research best practice- using this section with divs inside for structure, or the div on the outside with sections inside -->
			<section>
				<div class="info">
					<h4>You are about to rent:</h4>
					<ul>
						<li>Game Title: <em>{{ book.title }}</em></li>
						<li>Price: <em>${{ book.price }}</em></li>
					</ul>
				</div>

				<div class="info">
					<h4>Use this for testing:</h4>
					<ul>
						<li>Card Number: 424242424242</li>
						<li>CVC Code: 3-digit CVC</li>
						<li>Expiration: MM/YY</li>
					</ul>
				</div>
			</section>

			<section>
				<h3>One time payment</h3>
				<form action="#">
					<div class="form-group">
						<label for="cc-number">Credit Card Info</label>
						<input type="text"
									 class="form-control"
									 name="cc-number"
									 id="cc-number"
									 placeholder="XXXXXXXXXXXXXXXX"
									 v-model="card.number"
									 required>
					</div>

					<div class="form-group">
						<label for="cvc-number">CVC</label>
						<input type="text"
									 class="form-control"
									 name="cvc-number"
									 id="cvc-number"
									 placeholder="CVC"
									 v-model="card.cvc"
									 required>
					</div>

					<div class="form-group">
						<label for="expiration">Card Expiration Date</label>
						<input type="text"
									 class="form-control"
									 name="expiration"
									 id="expiration"
									 placeholder="MM/YY"
									 v-model="card.exp"
									 required>
					</div>
					<button class="button submit" @click.prevent="validate" :disabled="stripeCheck">Submit</button>
				</form>
				<div v-show="errors">
					<ol class="text-danger">
						<li v-for="(error, index) in errors" :key="index">
							{{ error }}
						</li>
					</ol>
				</div>
			</section>
		</article>
	</section>
</template>

<script>
import axios from 'axios';

// setting variable for the server call
const GAMESAPI = 'https://threebranches.hopto.org';

export default {
	data() {
		return {
			book: {
				title: '',
				publisher: '',
				instock: [],
				price: '',
			},
			card: {
				number: '',
				cvc: '',
				exp: '',
			},
			errors: [],
			stripePublishableKey: 'pk_test_2R90IX5GB273e9m9PSL40sgu00JA9PyQB4', //This is something to be fixed later for user accounts
			stripeCheck: false,
		};
	},
	methods: {
		// use the book id to populate the order information
		getBook() {
			const path = `${GAMESAPI}/books/${this.$route.params.id}`;
			axios.get(path)
				.then((res) => {
					this.book = res.data.book;
				})
				.catch((error) => {
				// eslint-disable-next-line
				console.error(error);
				});
		},
		// Introduce more robust validation fort later
		validate() {
			this.errors = [];
			let valid = true;
			if (!this.card.number) {
				valid = false;
				this.errors.push('Card number is required');
			}
			if (!this.card.cvc) {
				valid = false;
				this.errors.push('CVC is required');
			}
			if (!this.card.exp) {
				valid = false;
				this.errors.push('Expiration date is required');
			}
			// if the fields are valid, create the token
			if (valid) {
				this.createToken();
			}
		},
		// create a charge token for the transaction, setting the publishable key provided by the user instance
		createToken() {
			this.stripeCheck = true;
			window.Stripe.setPublishableKey(this.stripePublishableKey);
			window.Stripe.createToken(this.card, (status, response) => {
				if (response.error) {
					this.stripeCheck = false;
					this.errors.push(response.error.message);
					// eslint-disable-next-line
					console.error(response);
				} else {
					const payload = {
						book: this.book,
						token: response.id,
					};
					const path = `${GAMESAPI}/charge`;
					axios.post(path, payload)
						.then((res) => {
							this.$router.push({ path: `/complete/${res.data.charge.id}` });
						})
						.catch((error) => {
							// eslint-disable-next-line
							console.error(error);
						});
				}
			});
		},
	},
	created() {
		this.getBook();
	},
};
</script>

<style scoped>
.order-container {
	display: flex;
	flex-direction: column;

	margin: 0 auto;
	margin-top: 10vh;
	padding: 10px 20px;

	/* min-width: 60px; */
	min-width: fit-content;
	width: 45vw;
	max-width: 500px;

	background: rgb(239,85,44);
	background: linear-gradient(180deg, rgba(239,85,44,1) 0%, rgba(247,189,52,1) 100%);
	background-clip: padding-box;

	border-radius: 15px;
	border: 1px outset #ec5920;

	color: black;
}

.order-container h1 {
	margin-top: 2rem;
}

.order-container ul {
	padding-left: 0;
	list-style: none;
}

.order-container .info {
	margin-top: 10px;
}

.order-container h3 {
	margin: 15px 0;
	color: var(--abbadon-black);
}

.order-container > div.form-group {
	display: flex;
	flex-direction: column;
	margin: 5px 0;
}

.order-container .form-group {
	display: flex;
	align-items: center;
}

.order-container .form-group > label {
	display: block;
	min-width: 20ch;
	text-align: right;
	padding-right: 10px;
}

.form-group > .form-control {
	display: block;
	flex: 1;
	padding: .5rem;
	font-size: 1rem;
	background: rgba(0, 0, 0, 0.2);
	
	border: none; 
	border-bottom: 5px outset rgba(0, 0, 0, 0.2); /* create  nifty hook-like border edges on inputs*/
	border-left: 5px outset rgba(0, 0, 0, 0.2);
	border-radius: 20px;
	
	outline: rgba(0,0,0,0); /* shouldn't remove outlines, but I just make it invisible */
}

.form-group > .form-control::placeholder {
	color: var(--abbadon-black);
}


	/* -----------------Buttons------------- */
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
	color: black;
}

.return:hover,
.submit:hover {
	background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

.return {
	box-sizing: border-box;
	/* display: block; */
	text-decoration: none;
	color: black;
}
</style>

<template>
  <article class="table-wrap">
    <h1>Games</h1>
    <!-- Referencing the Alert.vue component, which appears to confirm game additions -->
    <alert :message="message" v-if="showMessage"></alert>
		<!-- Add button will display a modal -->
    <button type="button" class="button add" v-b-modal.book-modal>Add Game</button>

    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Publisher</th>
          <th>In Stock?</th>
          <th>Rental Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
				<!-- Using index :key="index to key and maintain the order of the books and avoid re-rendering components... Might be an issue if we want to have different order styling" -->
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ book.title }}</td>
          <td>{{ book.publisher }}</td>
          <td>
            <span v-if="book.instock">Yes</span>
            <span v-else>No</span>
          </td>
          <td>${{ book.price }}</td>
          <td>
            <div class="button-group">
							<!-- introduce edit game modal -->
              <button type="button" class="button update" v-b-modal.book-update-modal @click="editBook(book)">Update</button>
              <button type="button" class="button delete" @click="onDeleteBook(book)">Delete</button>
							<!-- link to rental page with id endpoint of game -->
							<router-link :to="`/order/${book.id}`" class="button rent">Rent</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add book modal, using this poopy-ass vue-bootstrap nonsense -->
		<!-- Bootstrap Vue does have modal two-way data binding functions handled though, so it's useful here -->
    <b-modal ref="addBookModal"
             id="book-modal"
             title="Add a new game"
             hide-footer>

      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
				<!-- title form group -->
        <b-form-group id="form-title-group"
                      label="Title:"
                      label-for="form-title-input">

					<b-form-input id="form-title-input"
                        type="text"
                        v-model="addBookForm.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
				<!-- author form group -->
        <b-form-group id="form-author-group"
                      label="Publisher:"
                      label-for="form-author-input">

          <b-form-input id="form-author-input"
                        type="text"
                        v-model="addBookForm.publisher"
                        required
                        placeholder="Enter publisher">
          </b-form-input>
        </b-form-group>
				<!-- price form group -->
				<b-form-group id="form-price-group"
                      label="Price:"
                      label-for="form-price-input">

          <b-form-input id="form-price-input"
                      type="number"
											step="0.01"
                      v-model="addBookForm.price"
                      required
                      placeholder="Enter price">
          </b-form-input>
        </b-form-group>
				<!-- in-stock check group -->
        <b-form-group id="form-instock-group">

          <b-form-checkbox-group v-model="addBookForm.instock" id="form-checks">
            <b-form-checkbox value="true">In Stock?</b-form-checkbox>
          </b-form-checkbox-group>

        </b-form-group>
				<!-- submit/reset buttons -->
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

      </b-form>
    </b-modal>


    <!-- Edit Games modal -->
    <b-modal ref="editBookModal"
             id="book-update-modal"
             title="Update"
             hide-footer>

      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
				<!-- Title edit group -->
        <b-form-group id="form-title-edit-group"
                      label="Title:"
                      label-for="form-title-edit-input">
          <b-form-input id="form-title-edit-input"
                        type="text"
                        v-model="editForm.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
				<!-- Author edit group -->
        <b-form-group id="form-author-edit-group"
                      label="Publisher:"
                      label-for="form-author-edit-input">

          <b-form-input id="form-author-edit-input"
                      type="text"
                      v-model="editForm.publisher"
                      required
                      placeholder="Enter publisher">
          </b-form-input>
        </b-form-group>
				<!-- price edit group -->
				<b-form-group id="form-price-edit-group"
                      label="Price:"
                      label-for="form-price-edit-input">

          <b-form-input id="form-price-edit-input"
                      type="number"
											step="0.01"
                      v-model="editForm.price"
                      required
                      placeholder="Enter price">
          </b-form-input>
        </b-form-group>
				<!-- instock check group -->
        <b-form-group id="form-instock-edit-group">
          <b-form-checkbox-group v-model="editForm.instock" id="form-checks">
            <b-form-checkbox value="true">In Stock?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
				<!-- update/cancel buttons -->
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </article>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';
// There is probably a better place to store this endpoint in a config file somewhere, this is sort of 'hacky'
const GAMESAPI = 'https://threebranches.hopto.org';

export default {
	data() {
		return {
			books: [],
			addBookForm: {
				title: '',
				publisher: '',
				instock: [],
				price: '',
			},
			// possible to use a single form for both?
			editForm: {
				id: '',
				title: '',
				publisher: '',
				instock: [],
				price: '',
			},
			message: '',
			showMessage: false,
		};
	},
	components: {
		alert: Alert,
	},
	methods: {
		// populate the table with the books from the server stored data
		getBooks() {
			const path = `${GAMESAPI}/books`;
			axios.get(path)
				.then((res) => {
					this.books = res.data.books;
				})
				.catch((error) => {
					// eslint-disable-next-line
          console.error(error);
				});
		},
		// pass in payload data from the addBook modal, post the new data to the back then asynchronously re-render the table with a success notification
		addBook(payload) {
			const path = `${GAMESAPI}/books`;
			axios.post(path, payload)
				.then(() => {
					this.getBooks();
					// think about how to make the message and showMessage revert after maybe a moment, or at all, really.
					this.message = 'Book added!';
					this.showMessage = true;
				})
				.catch((error) => {
					// eslint-disable-next-line
          console.log(error);
					this.getBooks();
				});
		},
		editBook(book) {
			this.editForm = book;
		},
		// reset the form fields
		initForm() {
			this.addBookForm.title = '';
			this.addBookForm.publisher = '';
			this.addBookForm.instock = [];
			this.addBookForm.price = '';
			this.editForm.id = '';
			this.editForm.title = '';
			this.editForm.publisher = '';
			this.editForm.instock = [];
			this.editForm.price = '';
		},
		// triggers add submit click to pass in the data to the asscociated functions
		onSubmit(evt) {
			evt.preventDefault();
			this.$refs.addBookModal.hide();
			let instock = false;
			if (this.addBookForm.instock[0]) instock = true;
			const payload = {
				title: this.addBookForm.title,
				publisher: this.addBookForm.publisher,
				instock, // property shorthand
				price: this.addBookForm.price,
			};
			this.addBook(payload);
			this.initForm();
		},
		//  triggers edit submit click to pass in the data to the asscociated functions
		onSubmitUpdate(evt) {
			evt.preventDefault();
			this.$refs.editBookModal.hide();
			let instock = false;
			if (this.editForm.instock[0]) instock = true;
			const payload = {
				title: this.editForm.title,
				publisher: this.editForm.publisher,
				instock,
				price: this.editForm.price,
			};
			this.updateBook(payload, this.editForm.id);
		},
		// use the submitted payload from the form and the id associated to change the stored data
		updateBook(payload, bookID) {
			const path = `${GAMESAPI}/books/${bookID}`;
			axios.put(path, payload)
				.then(() => {
					this.getBooks();
					this.message = 'Book updated!';
					this.showMessage = true;
				})
				.catch((error) => {
					// eslint-disable-next-line
          console.error(error);
					this.getBooks();
				});
		},
		// use game id endpoint to delete specific item from table
		removeBook(bookID) {
			const path = `${GAMESAPI}/books/${bookID}`;
			axios.delete(path)
				.then(() => {
					this.getBooks();
					this.message = 'Book deleted!';
					this.showMessage = true;
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error);
					this.getBooks();
				});
		},
		// trigger removeBook associated with row
		onDeleteBook(book) {
			this.removeBook(book.id);
		},
		onReset(evt) {
			evt.preventDefault();
			this.$refs.addBookModal.hide();
			this.initForm();
		},
		onResetUpdate(evt) {
			evt.preventDefault();
			this.$refs.editBookModal.hide();
			this.initForm();
			this.getBooks(); // why?
		},
	},
	created() {
		this.getBooks();
	},
};
</script>

<style scoped>
	/* --------------Games---------------- */
.table-wrap {
  display: flex;
  flex-direction: column;
	margin: 0 auto;
  margin-top: 60px;
  padding: 10px 20px;
  min-width: 60px;
  width: fit-content;
	background: rgb(239,85,44);
	background: linear-gradient(180deg, rgba(239,85,44, 1) 0%, rgba(247,189,52,1) 100%);
	background-clip: padding-box;
	border-radius: 15px;
	border: 1px outset #ec5920;
	color: black;
}

.table-wrap > h1 {
  width: 75vw;
  text-align: left;
}

.table {
  display: flex;
  flex-direction: column;
}

thead,
tbody {
  display: flex;
}

tbody {
  flex-direction: column;
}

.table tr {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px 0;
  border-top: 1px darkslategrey solid;
}

thead > tr > th,
tbody > tr > td {
 flex: 1;
 /* margin: auto; */
}

/* -----------------Product table buttons------------------------- */
.button-group {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-end;
}

.table-wrap .button,
.table-wrap .button .rent {
	display: block;
	flex-grow: 1;
	margin: .5rem .75rem .25rem 0;
	padding: .5rem;
	width: 15ch;
	font-size: 14px;
  border: none;
	border-radius: 15px;
	background: rgba(0, 0, 0, 0.4);
	cursor: pointer;
	transition: all .2s ease-in;
}

.table-wrap .button.add {
	margin-bottom: .75rem;
}

.add:hover {
  background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

.update:hover {
  background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

.delete:hover {
  background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

/* Since Rent is actually a router-link that generates an achor tag from an endpoint and product ID, it will require some*/
 /*separate, special styling, though it is under the button section, because functionally, it will have the same purpose  */

.rent {
	box-sizing: border-box;
	/* display: block; */
	text-decoration: none;
	color: black;
}

.rent:hover {
	background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

/* -------------------------------------------------------------------------------------- */
/* ----------modal Styling ---------------- */
/* A lot of this modal styling is just wresting control back from bootstrap-vue */
/* So there will also be some re-declarations of BS-vue's original styles, just to help us understand what is already touched by it */

.modal-open .modal {
	overflow-x: hidden;
	overflow-y: auto;
}

/* Ensure that the modal covers the entirety of the screen without budge */
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	outline: none;
}

/* Establish the transition timing for background transparency */

.fade {
	transition: all .1s linear;
	transition-delay: 0s;
}

/* When then Add/Update button is clicked, this class is appended to the element, triggering the modal box, and casting an overlay to the bg */
/* NOTE_____ I need to find a way to fix the transition to occur in tandem with the modal appearing, not after. */

.show {
	background-color: hsla(270deg, 0%, 10%, 0.5);
	transition-delay: 0s;
}

.modal.fade .modal-dialog {
	transform: translateY(-50px);
	transition: all .1s linear;
	transition-delay: 0s;
	opacity: 0;
}

.modal.show .modal-dialog {
	transform: none;
	opacity: 1;
}

.modal-dialog {
	position: relative;
	margin: 20vh auto;
	max-width: 500px;
	text-align: left;
	pointer-events: none;
}

.modal-content {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	pointer-events: auto;
	background: rgb(239,85,44);
	background: linear-gradient(180deg, rgba(239,85,44,1) 0%, rgba(247,189,52,1) 100%);
	background-clip: padding-box;
	border: 1px outset #ec5920;
	border-radius: 7px;
	color: black;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid darkslategrey;
}

.modal-title {
	margin: 0;
	/* padding:; */
	font-size: 1rem;
}

.close {
	background: none;
	border: none;
	font-size: 2rem;
	cursor: pointer;
	transition: all .1s ease-in;
}

.close:hover {
	color: darkslategray;
	transform: scale(1.25);
}

.modal-body {
	padding: 1rem;
}

.form-group {
	display: flex;
	align-items: center;
	padding: .5rem 0;
}

.form-group > div {
	display: flex;
	flex:1;
}

.form-group > label {
	min-width: 10ch;
	font-size: 1rem;
}

.form-group > div > .form-control {
	display: block;
	flex: 1;
	padding: .5rem;
	font-size: 1rem;
	background: rgba(0, 0, 0, 0.2);
	border: none;
	border-bottom: 5px outset rgba(0, 0, 0, 0.2);
	border-left: 5px outset rgba(0, 0, 0, 0.2);
	border-radius: 20px;
	outline: rgba(0,0,0,0);
}

.form-group > div > .form-control::placeholder {
	color: black;
}

fieldset.form-group {
	border: none;
	padding: 1rem 0;
}

.modal-content .btn {
	padding: .5rem;
	margin: .75rem 1rem .5rem 0;
	min-width: 10ch;
	font-size: 1rem;
	/* background: linear-gradient(180deg, rgba(239,85,44,1) 0%, rgba(247,189,52,1) 100%); */
	/* border: 3px outset rgba(239,85,44,1); */
	background: rgba(0, 0, 0, 0.4);
	border: none;
	border-radius: 15px;
	/* box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4); */
	cursor: pointer;
	transition: all .2s ease-in;
}

.modal-content .btn-primary:hover {
	background: rgba(247,189,52,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

.modal-content .btn-danger:hover {
	background: rgba(239,85,44,1);
	box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.4);
	transform: translate(-.05rem, -.05rem);
}

</style>

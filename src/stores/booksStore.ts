import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";
import { Book, GivenBook, AvBook, DocTrans } from "@/models/books";
import { th } from "date-fns/locale";
import { i18n } from "@/main"; // Импортируем экземпляр i18n

const toast = useToast();

export const useBooksStore = defineStore({
  id: "books",
  state: () => ({
    books: null as Book[] | null,
    booksToEdit: null as Book | null,
    booksToEditId: null as string | null,
    editBookShow: false,
    givenToPersonBooksList: null as GivenBook[] | null,
    givenToPersonBooksTotal: null as number | null,
    avBooksList: null as AvBook[] | null,
    avBooksTotal: null as Number | null,
    docsTransList: null as DocTrans[] | null,
  }),
  actions: {
    async fetchBooks() {
      try {
        const response = await api.BooksApi.getBooks({
            sort: [],
            filters: [],
            global_search: "",
            per_page: 10000,
            page: 1
          });
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.books = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchCreateBook(creds: any) {
      try {
        await api.BooksApi.createBook(creds)
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchBooksToEdit(id: string) {
      try {
        const response = await api.BooksApi.getBookById(this.booksToEditId);
        
        console.log('book uploaded')
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.booksToEdit = response.data[0]
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchDeleteBook(ids: string[]){
      try {
        const queryParams = JSON.stringify(ids.map(id => id));
        const encodedParams = encodeURIComponent(queryParams);

        await api.BooksApi.deleteBook(encodedParams);
        toast.success(i18n.global.t('others.succesfullyAdded'));
      } catch (error: any) {
        toast.error(`${error.message}`);
      }
    },
    setEditBookShow (value: boolean, id: any){
      this.booksToEditId = id
      this.editBookShow = value
    },

    async fetchGivenToPersonBooks (id: string, filters: {type: string, name: string, text: string}[] | null, perPage: number | null, page: number | null) {
      try {
        const queryParams = {
          sort: [],
          filters: filters || [],
          global_search: "",
          per_page: perPage || 10,
          page: page || 1
        };
        const additionalParameter = {
          personId: id,
          operationTypeNumber: null,
          returnDate: null,
          transDocNumber: null
        };

        const queryString = `queryParams=${encodeURIComponent(JSON.stringify(queryParams))}&additionalParameter=${encodeURIComponent(JSON.stringify(additionalParameter))}`;
        const response = await api.BooksApi.getGivenToPersonBooks(queryString);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.givenToPersonBooksTotal = response.total
          this.givenToPersonBooksList = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }      
    },

    async fetchAvBooks (id: string, filters: {type: string, name: string, text: string}[] | null, perPage: number | null, page: number | null) {
      try {
        const queryParams = {
          sort: [],
          filters: filters || [],
          global_search: "",
          per_page: perPage || 10,
          page: page || 1
        };
        const additionalParameter = {
          personId: id,
          operationTypeNumber: null,
          returnDate: null,
          transDocNumber: null
        };

        const queryString = `queryParams=${encodeURIComponent(JSON.stringify(queryParams))}&additionalParameter=${encodeURIComponent(JSON.stringify(additionalParameter))}`;
        const response = await api.BooksApi.getAvBooks(queryString);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.avBooksList = response.data
          this.avBooksTotal = response.total
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }      
    },
    async fetchGiveBook (queryParams: string[], personId: string, date: string, transDocNumber: string ) {
      try {
        const additionalParameter = {
          personId: personId,
          operationTypeNumber: 0,
          returnDate: date,
          transDocNumber: Number(transDocNumber)
        };

        const encodedQueryParams = encodeURIComponent(JSON.stringify(queryParams));
        const encodedAdditionalParameter = encodeURIComponent(JSON.stringify(additionalParameter));
        
        const queryString = `queryParams=${encodedQueryParams}&additionalParameter=${encodedAdditionalParameter}`;

        const response = await api.BooksApi.giveBook(queryString);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          toast.success(i18n.global.t('others.succesfullyAdded'));
        }
        
      } catch (error: any) {
        toast.error(i18n.global.t('others.error2'));
      }      
    },
    async fetchReturnBooks (queryParams: string[], personId: string, date: string, transDocNumber: string ) {
      try {
        const additionalParameter = {
          personId: personId,
          operationTypeNumber: 1,
          returnDate: date,
          transDocNumber: Number(transDocNumber)
        };

        const encodedQueryParams = encodeURIComponent(JSON.stringify(queryParams));
        const encodedAdditionalParameter = encodeURIComponent(JSON.stringify(additionalParameter));
        
        const queryString = `queryParams=${encodedQueryParams}&additionalParameter=${encodedAdditionalParameter}`;

        const response = await api.BooksApi.returnBooks(queryString);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          toast.success(i18n.global.t('others.succesfullyAdded'));
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }      
    },
    async fetchDocsTrans (personId: string) {
      try {

        const queryParams = {
          sort: [],
          filters: [],
          global_search: "",
          per_page: 10000,
          page: 1,
        };
        const additionalParameter = {
          personId: personId
        };

        const queryParamsString = encodeURIComponent(JSON.stringify(queryParams));
        const additionalParameterString = encodeURIComponent(JSON.stringify(additionalParameter));

        
        const queryString = `queryParams=${queryParamsString}&additionalParameter=${additionalParameterString}`;

        const response = await api.BooksApi.getDocsTrans(queryString);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.docsTransList = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }      
    }
  },
  getters: {
    getBooksList: (state) => state.books,
    getBooksToEdit: (state) => state.booksToEdit,
    getEditBookShowState: (state) => state.editBookShow,
    getEditBookId: (state) => state.booksToEditId,
    getGivenToPersonBooksList: (state) => state.givenToPersonBooksList,
    getGivenToPersonBooksTotal: (state) => state.givenToPersonBooksTotal,
    getavBooksList: (state) => state.avBooksList,
    getavBooksTotal: (state) => state.avBooksTotal,
    getDocsTransList: (state) => state.docsTransList,
  },
});

 
 var startIndex = 0;
 var maxResults = 12;
 var totalItems = 0;

function fetchBooks() {
    var endpoint = `https://www.googleapis.com/books/v1/volumes?q=javascript&startIndex=${startIndex}&maxResults=${maxResults}`;
        
    $.ajax({
        url: endpoint,
        dataType: "json",
        success: function(data) {
            totalItems = data.totalItems;
            updatePaginationButtons();
            listAllBooks(data.items);
        },
          error: function(xhr, status, error) {
            console.error("Erro ao buscar livros:", error);
          }
    });
}


function listAllBooks(books) {
    var ctx = '.all_books';
    $(ctx).empty();

    books.forEach(book=> {
      var model = $('.model_book').clone().removeClass('d-none').attr('id',book.id )[0];
      $(model).find('#book_banner').attr('src', book.volumeInfo.imageLinks.thumbnail);
      $(model).find('#book_title').text(book.volumeInfo.title);
      $(ctx).append(model);
    });
  }

  const listAllBorrowedBooks = async (books) => {
    var ctx = '.all_borrowed_books';
    $(ctx).empty();
  
    try {
      for (const book of books) {
        const singleBook = await fetchBookById(book.book); //
  
        if (singleBook) {
          var model = $('.model_borrowed_books').clone().removeClass('d-none').attr('id', book.id)[0];
          $(model).find('#book_banner').attr('src', singleBook.volumeInfo.imageLinks.thumbnail);
          $(ctx).append(model);
        }
      }
    } catch (error) {
      console.error("Erro ao listar livros emprestados:", error);
    }
  };
  

  function fetchBookById(bookId) {
    return new Promise((resolve, reject) => {
      var endpoint = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  
      $.ajax({
        url: endpoint,
        dataType: "json",
        success: function(data) {
          resolve(data); // Resolve a Promise com os dados do livro
        },
        error: function(xhr, status, error) {
          reject(error); // Rejeita a Promise em caso de erro
        }
      });
    });
  }
  

function listSingleBook(content) {
    const ctx = '.modal_book'
    $(ctx).find('.book_title').text( content.volumeInfo.title)  
    $(ctx).find('.book_banner').attr('src' , content.volumeInfo.imageLinks.thumbnail)  
    $(ctx).find('.book_desacription').text(content.volumeInfo.description)  

    $(ctx).modal('show')
  }

function updatePaginationButtons() {
    $('#prevBtn').prop('disabled', startIndex === 0);
    $('#nextBtn').prop('disabled', startIndex + maxResults >= totalItems);
}

const init = async()=>{
    try{

    await fetchBooks();
    await list('books', listAllBorrowedBooks)
    
    }catch(error){
        console.log(error)
    }
}
init()
$(document).ready(function() {
    $('#prevBtn').on('click', function() {
      if (startIndex - maxResults >= 0) {
        startIndex -= maxResults;
        fetchBooks();
      }
    });
  
    // Evento de clique no botão Próximo
    $('#nextBtn').on('click', function() {
      if (startIndex + maxResults < totalItems) {
        startIndex += maxResults;
        fetchBooks();
      }
    });
    
    $('body').on('click', '.model_book', async(e) =>{
        const id = $(e.currentTarget).attr('id')
        const data = await fetchBookById(id)
        console.log(data)
        listSingleBook(data);
      });
  });
  
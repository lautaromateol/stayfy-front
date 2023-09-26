const validation = ({title, authors, publisher, image, publishedDate, pageCount, genre, price, description}) => {

    let errors = {};

    // REGEX
    const regexNotNumbers = /([0-9])+/;
    const regexImg = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
    const regexOnlyYears = /^(18[0-9]{2}|19[0-9]{2}|20[0-4][0-9]|2050)$/
    const regexPages = /^([0-9]|[1-4][0-9]{0,3}|5000)$/
    const regexPrice = /^[0-9]+(\.[0-9]+)?$/


    // VALIDATIONS

    if(!title){
        errors.title = 'Please, insert a title'
    }else if(title.length < 2 || title.length > 20){
        errors.title = 'The title must be between 2  and  20 characters'
    }

    if(!authors){
        errors.authors = 'Please, insert an author'
    }else if(authors.length < 2 || authors.length > 25){
        errors.authors = 'This field must contain between 2 and 25 characters'
    }
    if(regexNotNumbers.test(authors)){
        errors.authors = 'Numbers are not allowed in this field'
    }


    if(!publisher){
        errors.publisher = 'Please, insert a publisher'
    }else if(publisher.length > 20){
        errors.publisher = 'This field must contain between 2 and 20 characters'
    }


    if(!image){
        errors.image = 'Please, insert an image in URL format' 
    }else if(!regexImg.test(image)){
        errors.image = 'Please, insert a valid image format'
    }

    if(!publishedDate){
        errors.publishedDate = 'Please, insert a year'
    }else if(!regexOnlyYears.test(publishedDate)){
        errors.publishedDate = 'Insert a valid format'
    }


    if(!pageCount){
        errors.pageCount = 'Please, insert a number of pages'
    }else if(!regexPages.test(pageCount)){
        errors.pageCount = 'Insert a valid format'
    }


    if(!genre){
        errors.genre = 'Please, insert a genre'
    }else if(genre.length < 3){
        errors.genre = 'This field must contain at least 3 characters'
    }else if(regexNotNumbers.test(genre)){
        errors.genre = 'Numbers are not allowed in this field'
    }


    if(!price){ 
        errors.price = 'Please, insert a price'
    }else if(!regexPrice.test(price)){
        errors.price = 'Insert a valid format'
    }else if(price.length > 5){
        errors.price = 'Insert a valid format'
    }


    if(!description){
        errors.description = 'Please, insert a description'
    }else if(description.length < 10 || description.length > 1000){
        errors.description = 'This field must contain between 10 and 1000 characters'
    }

    return errors
}

export default validation
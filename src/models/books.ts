export interface Book {
    id: string,
    title: string,
    yearPublished: number,
    annotation: string,
    bookCover: string,
    isbn: string    ,
    summary: string,
    totalCopies: number,
    description: string,
    barcodeNumber: string,
    categoryNames: string,
    groupNames: string,
    publisherName: string,
    author: Author[],
    publisher: Publisher[],
    category: Category[],
    group: Group[]
}

export interface GivenBook {
    id: string,
    title: string,
    bookAuthors: string,
    isbn: string,
    barcodeNumber: string,
    groupNames: string,
    returnDate: string,
    transactionId: string,
    personId: string
}

export interface AvBook {
    id: string,
    title: string,
    bookAuthors: string,
    isbn: string,
    barcodeNumber: string,
    groupNames: string,
    bookInfo: string,
    avCount: string
}

export interface DocTrans {
    id: string,
    bookTitles: string,
    docNumber: string,
    author: string,
    docType: string,
    dateCreate: string,
    docDate: string,
    docId: string,
    personId: string
}

export interface Publisher {
    id: string,
    name: string,
    country: Country
}

export interface Country {
    id: string,
    iso: string,
    name: string,
    nicename: string,
    iso3: string,
    numcode: number,
    phonecode: number
}

export interface Category {
    id: string,
    name: string,
    description: string
}

export interface Group {
    id: string,
    name: string,
    description: string
}

export interface Author {
    id: string,
    firstName: string,
    lastName: string,
    fatherName: string,
    dateCreate: string,
    dateUpdate: string,
    birthDate: string,
    country: Country,
    birthDateStr: string,
    fio: string
}
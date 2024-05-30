export interface AvailabilityReport {
    id: string,
    isbn: string,
    title: string,
    yearPublished: number,
    totalCopies: number,
    curAvailability: number | null
}

export interface MovementReport {
    id: string,
    isbn: string,
    title: string,
    yearPublished: number,
    barcodeNumber: string,
    division: string,
    fioSt: string,
    issueDate: string,
    returnDate: string,
    author: string
}
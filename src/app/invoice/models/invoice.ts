
export interface Invoice {
    code?:         string;
    client:       string;
    city:         string;
    nit:          number;
    total:        number;
    subTotal:     number;
    iva:          number;
    retention:    number;
    creationDate: string;
    status:       string;
    changeStatus: string;
    paid:         string;
    paymentDate:  string;
    email: string;
}

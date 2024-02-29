
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Invoice {
    nr: number;
    isStorno?: Nullable<boolean>;
    currency?: Nullable<string>;
    amount?: Nullable<number>;
    date?: Nullable<Date>;
}

export abstract class IQuery {
    abstract invoices(): Nullable<Nullable<Invoice>[]> | Promise<Nullable<Nullable<Invoice>[]>>;

    abstract invoice(nr?: Nullable<number>): Invoice | Promise<Invoice>;
}

export abstract class IMutation {
    abstract create(isStorno?: Nullable<boolean>, currency?: Nullable<number>, amount?: Nullable<number>, customerId?: Nullable<number>): Nullable<Invoice> | Promise<Nullable<Invoice>>;

    abstract update(nr?: Nullable<number>, isStorno?: Nullable<boolean>, currency?: Nullable<number>, amount?: Nullable<number>, customerId?: Nullable<number>): Nullable<Invoice> | Promise<Nullable<Invoice>>;
}

type Nullable<T> = T | null;


/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Customer {
    id: number;
    name?: Nullable<string>;
}

export class Invoice {
    nr: number;
    isStorno?: Nullable<boolean>;
    currency?: Nullable<string>;
    amount?: Nullable<number>;
    date?: Nullable<Date>;
    customer: Customer;
    projects?: Nullable<Nullable<Project>[]>;
}

export abstract class IQuery {
    abstract invoices(): Nullable<Nullable<Invoice>[]> | Promise<Nullable<Nullable<Invoice>[]>>;

    abstract invoice(nr?: Nullable<number>): Invoice | Promise<Invoice>;
}

export abstract class IMutation {
    abstract create(isStorno?: Nullable<boolean>, currency?: Nullable<string>, date?: Nullable<Date>, amount?: Nullable<number>, customer?: Nullable<number>, projects?: Nullable<Nullable<number>[]>): Nullable<Invoice> | Promise<Nullable<Invoice>>;

    abstract update(nr?: Nullable<number>, isStorno?: Nullable<boolean>, currency?: Nullable<string>, date?: Nullable<Date>, amount?: Nullable<number>, customer?: Nullable<number>, projects?: Nullable<number>): Nullable<Invoice> | Promise<Nullable<Invoice>>;
}

export class Project {
    id: number;
    name?: Nullable<string>;
}

type Nullable<T> = T | null;


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
    stornoRef?: Nullable<number>;
    currency?: Nullable<string>;
    amount?: Nullable<number>;
    date?: Nullable<Date>;
    paid?: Nullable<boolean>;
    customer: Customer;
    projects?: Nullable<Nullable<Project>[]>;
}

export abstract class IQuery {
    abstract invoices(): Nullable<Nullable<Invoice>[]> | Promise<Nullable<Nullable<Invoice>[]>>;

    abstract invoice(nr?: Nullable<number>): Invoice | Promise<Invoice>;
}

export abstract class IMutation {
    abstract create(currency?: Nullable<string>, amount?: Nullable<number>, date?: Nullable<Date>, customer?: Nullable<number>, projects?: Nullable<Nullable<number>[]>): Nullable<Invoice> | Promise<Nullable<Invoice>>;

    abstract update(nr?: Nullable<number>, currency?: Nullable<string>, amount?: Nullable<number>, date?: Nullable<Date>, customer?: Nullable<number>, projects?: Nullable<Nullable<number>[]>): Nullable<Invoice> | Promise<Nullable<Invoice>>;

    abstract markAsPaid(nr?: Nullable<number>, paid?: Nullable<boolean>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createStorno(nr?: Nullable<number>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Project {
    id: number;
    name?: Nullable<string>;
}

type Nullable<T> = T | null;

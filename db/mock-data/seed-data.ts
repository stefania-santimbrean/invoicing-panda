import { Invoice } from '../../src/entities/invoice.entity';

export const CUSTOMER_DATA = [
  {
    name: 'PANDA INC',
  },
  {
    name: 'CH INC',
  },
];
export const PROJECT_DATA = [
  {
    name: 'Panda Factory',
  },
  {
    name: 'Panda Farmacy',
  },
];
export const INVOICES_DATA: Partial<Invoice>[] = [
  {
    isStorno: false,
    currency: 'RON',
    amount: 100,
    date: new Date('03.01.2023'),
  },
  {
    isStorno: false,
    currency: 'RON',
    amount: 200,
    date: new Date('01.01.2022'),
  },
  {
    isStorno: false,
    currency: 'EUR',
    amount: 50,
    date: new Date('01.03.2022'),
  },
];

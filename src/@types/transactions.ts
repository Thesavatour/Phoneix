type TransactionsResponse = {
  transactions: Transaction[];
  transactions_meta: TransactionsMeta;
};

type TransactionsMeta = {
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
};

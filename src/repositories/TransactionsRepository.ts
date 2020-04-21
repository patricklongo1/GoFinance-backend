import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomeTransactiosn = await this.find({
      where: { type: 'income' },
    });
    const outcomeTransactiosn = await this.find({
      where: { type: 'outcome' },
    });

    const income = incomeTransactiosn.reduce(function calc(acc, value) {
      return acc + Number(value.value);
    }, 0);

    const outcome = outcomeTransactiosn.reduce(function calc(acc, value) {
      return acc + Number(value.value);
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;

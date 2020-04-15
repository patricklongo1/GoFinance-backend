import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne({
      where: { id: transaction_id },
    });

    if (transaction) {
      await transactionsRepository.delete(transaction_id);
    } else {
      throw new AppError('Transaction not found');
    }
  }
}

export default DeleteTransactionService;

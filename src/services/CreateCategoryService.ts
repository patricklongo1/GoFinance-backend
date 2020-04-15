import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const categoryExists = await categoriesRepository.findOne({
      where: { title },
    });

    if (categoryExists) {
      throw new AppError('This Category already exists.');
    }

    const category = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;

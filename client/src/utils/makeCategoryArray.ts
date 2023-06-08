import categoryData from '../data/categoryData';
import { CategoryType } from '../types/dataTypes';

export default (data: CategoryType[]) => {
  const newCategories: CategoryType[] = [];

  data.forEach((category) => {
    const newCategory = {
      ...category,
      categoryName: categoryData[category.categoryName].text,
      categoryIcon: categoryData[category.categoryName].icon
    };

    category.categoryName === 'OTHER'
      ? newCategories.unshift(newCategory)
      : newCategories.push(newCategory);
  });

  return newCategories;
};

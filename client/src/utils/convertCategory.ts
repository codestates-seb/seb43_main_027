import { categoryText } from '../data/categoryData';

const convertCategory = {
  asKR(tag: string) {
    return categoryText[tag];
  },
  asEN(tag: string) {
    for (const [k, v] of Object.entries(categoryText)) {
      if (v === tag) return k;
    }
    return '';
  }
};

export default convertCategory;

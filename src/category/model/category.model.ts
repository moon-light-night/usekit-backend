export class Category {
  category_id: number;
  name: string;

  constructor(name: string, category_id: number) {
    this.category_id = category_id;
    this.name = name;
  }
}

export interface ICategoryResponse {
  category: Category;
}

export interface ICategoriesResponse {
  categories: Category[];
}

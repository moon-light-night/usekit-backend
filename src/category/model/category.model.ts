export class Category {
  category_id: number;
  title: string;

  constructor(name: string, category_id: number) {
    this.category_id = category_id;
    this.title = name;
  }
}

export interface ICategoryResponse {
  category: Category;
}

export interface ICategoriesResponse {
  categories: Category[];
}

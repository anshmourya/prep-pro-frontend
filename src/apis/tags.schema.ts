import { Paginator } from "@/hooks/useFilter";

export interface Tag {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface TagResponse {
  data: Tag[];
  paginator: Paginator;
}

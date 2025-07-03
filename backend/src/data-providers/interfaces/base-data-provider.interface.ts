export interface BaseDataProvider<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  update(id: number, data: UpdateDto): Promise<T>;
  remove(id: number): Promise<void>;
} 
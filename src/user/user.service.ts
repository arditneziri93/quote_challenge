import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // For password comparison

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findAll(page?: number, pageSize?: number): Promise<User[]> {
    const realPage = page ?? 1;
    const realPageSize = pageSize ?? 10;
    const skip = realPageSize * (realPage - 1);
    return this.repo.find({
      skip,
      take: realPageSize,
    });
  }

  async findRandom(pageSize?: number): Promise<User[]> {
    const realPageSize = pageSize ?? 1;
    const users = await this.repo.find();
    const RealQuotes = this.shuffle(users);
    return RealQuotes.slice(0, realPageSize);
  }

  private shuffle(users: User[]) {
    let index = users.length,
      j: number,
      temp: User;
    while (--index > 0) {
      j = Math.floor(Math.random() * (index + 1));
      temp = users[j];
      users[j] = users[index];
      users[index] = temp;
    }
    return users;
  }

  async findOne(id: number): Promise<User | undefined> {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) throw Error('notfound');
    return result;
  }

  async findByUserEmail(email: string): Promise<User | undefined> {
    const result = await this.repo.findOne({ where: { email } });
    if (!result) throw Error('notfound');
    return result;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user); // Creates a new entity instance (not yet saved to DB)
    // eslint-disable-next-line
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.repo.save(newUser); // Saves the instance to the database
  }

  async update(id: number, user: Partial<User>): Promise<User | undefined> {
    await this.repo.update(id, user); // Updates by ID directly
    return this.repo.findOne({ where: { id } }); // Returns the updated user
  }

  // Deletes by ID
  async remove(id: number): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    if (deleted.affected > 0) {
      return true;
    }
    return false;
  }
}

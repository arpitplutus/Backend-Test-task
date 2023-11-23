import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  author: string;

  @Column({ default: false })
  isDeleted: boolean;

  @BeforeInsert()
  generateUniqueISBN() {
    const randomNumber = Math.floor(Math.random() * 10000000000);
    this.isbn = `BOOK-${randomNumber}`;
  }
}

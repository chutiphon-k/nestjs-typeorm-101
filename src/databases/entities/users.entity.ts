import {
  Entity,
  PrimaryColumn,
  BeforeInsert,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import * as uniqid from 'uniqid';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  _id: string;

  @Column()
  displayName: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @UpdateDateColumn({ precision: 3, default: () => 'now()' })
  updatedAt: Date;

  @CreateDateColumn({ precision: 3, default: () => 'now()' })
  createdAt: Date;

  @BeforeInsert()
  private _beforeInsert() {
    this._id = uniqid();
  }

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

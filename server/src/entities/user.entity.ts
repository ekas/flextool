import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ name: 'avatar_id', nullable: true, default: null })
  avatarId?: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role' })
  role: 'admin' | 'user' | 'operator';

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  // @JoinColumn({ name: 'avatar_id' })
  // @OneToOne(() => File, {
  //   nullable: true,
  // })
  // avatar?: File;

  //   @OneToMany(() => App, (app) => app.user)
  //   apps: App[];
}

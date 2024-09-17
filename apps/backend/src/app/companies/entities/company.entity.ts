import { BaseEntity } from '../../../common/entities/base-entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class CompanyEntity extends BaseEntity {
  @Index('company_vat_index', { unique: true })
  @Column({ type: 'varchar', unique: true })
  VAT: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.company)
  users: UserEntity;
}

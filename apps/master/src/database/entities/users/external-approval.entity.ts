import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { ApprovalType } from './types/approval-type.enum';

import { UserProfile } from './user-profile.entity';
import { BaseTrackedEntityHelper } from '@aiokit/typeorm';
import {
  IsNumberLocalized,
  IsStringCombinedLocalized,
  IsStringEnumLocalized,
  IsUUIDLocalized,
} from '@aiokit/validation';
import { Expose } from 'class-transformer';

/**
 * 外部审批实体。
 * 用于对用户电子邮件或电话号码或任何其他需要批准的内容进行外部批准
 * 您可以使用或不使用代码字段，这取决于您
 * 对于电子邮件批准 ID 就足够了
 * 对于电话号码批准，您可以使用代码字段
 * 对于其他情况，您可以根据您的需要同时使用 id 和 code 字段
 * */
@Entity('external_approvals')
export class ExternalApproval extends BaseTrackedEntityHelper {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @IsUUIDLocalized()
  id!: string;

  @Column({ nullable: false })
  @Index()
  @Expose()
  @IsUUIDLocalized()
  userId!: string;

  @Expose()
  @Column({ nullable: false, length: 128 })
  @IsStringCombinedLocalized({ minLength: 1, maxLength: 128 })
  code!: string;

  @Column({
    type: 'enum',
    enum: ApprovalType,
    nullable: false,
  })
  @IsStringEnumLocalized(ApprovalType)
  approvalType!: ApprovalType;

  @ManyToOne(() => UserProfile, {
    eager: true,
  })
  @JoinColumn()
  user!: UserProfile;

  @VersionColumn()
  @IsNumberLocalized()
  @Expose()
  version!: number;
}

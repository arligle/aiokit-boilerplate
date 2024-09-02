import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUIDLocalized,
  IsIntegerStringCombinedLocalized,
  IsNotEmptyLocalized,
} from '@aiokit/validation';
/**
 * @description 向用户显示有关实体创建的一般友好消息
 */
export class SimpleResponseForCreatedEntityWithMessage<ID> {
  @ApiProperty({
    description:
      'General friendly message that can be shown to the user, about entity creation',
  })
  message!: string;
  data!: {
    id: ID;
  };
}
/**
 * @description Entity id, uuid v4 format
 */
export class IdParamUUID {
  @ApiProperty({
    description: 'Entity id, uuid v4 format',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUIDLocalized()
  id!: string;
}
/**
 * @description 实体的版本号
 */
export class VersionNumberParam {
  @ApiProperty({
    description: 'Version number of entity',
    example: '1',
    minimum: 0,
    required: true,
  })
  @IsNotEmptyLocalized()
  @IsIntegerStringCombinedLocalized({
    min: 0,
  })
  version!: number;
}

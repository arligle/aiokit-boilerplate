import { AccessTokenPayload } from './token-payload';
import { UserClsStore } from '@aiokit/auth';

export type ClsStore = UserClsStore<AccessTokenPayload>

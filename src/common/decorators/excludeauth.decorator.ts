import { SetMetadata } from '@nestjs/common';

export const ExcludeAuth = (...auth: boolean[]) => SetMetadata('auth', auth);

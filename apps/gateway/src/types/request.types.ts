import { Token } from '@prisma/client';

export class RequestWithTokenUser extends Request {
  user: Token;
}

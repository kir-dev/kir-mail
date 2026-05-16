import { Token } from '../generated/client.js';

export class RequestWithTokenUser extends Request {
  user: Token;
}

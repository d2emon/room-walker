import { Request } from 'express';

interface UserRequestBody {
  name?: string,
}

export default interface UserRequest extends Request {
  userId: string;
  body: UserRequestBody;
}

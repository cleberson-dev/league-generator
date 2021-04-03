import { SavedUserId } from 'common/repositories';
import 'express';

type User = {
  id: SavedUserId
}

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
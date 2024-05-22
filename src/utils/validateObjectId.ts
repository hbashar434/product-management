import mongoose from 'mongoose';
import { ApiError } from './ApiError';

export const validateObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid product ID format!');
  }
};

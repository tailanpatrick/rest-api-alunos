import { Request } from 'express';

interface RequestWithData extends Request {
    userId?: string;
    userEmail?: string;
}

export { RequestWithData };


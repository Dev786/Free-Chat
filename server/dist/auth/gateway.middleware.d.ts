import { Request, Response, NextFunction } from "express";
export declare function gatewayMiddleware(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;

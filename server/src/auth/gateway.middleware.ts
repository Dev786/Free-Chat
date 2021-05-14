import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "src/config";
import * as jwt from 'jsonwebtoken';
const configService = new ConfigService('.env');

export function gatewayMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.headers && req.headers.authorization) {
            const JWT_SECRET_KEY = configService.get("JWT_SECRET_KEY");
            const token = req.headers.authorization.split(' ')[1];
            const tokenData: any = jwt.verify(token, JWT_SECRET_KEY);
            console.log("tokenData: ", tokenData, "req: ",req);
            const userId = tokenData?.userId;
            if (req.method == 'GET') {
                req.query.userId = userId;
            } else if (['POST', 'PUT'].includes(req.method)) {
                req.body.userId = userId;
            }
            next();
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(401);
    }
}
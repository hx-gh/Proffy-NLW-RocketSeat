import { Request, Response } from 'express';
import db from '../database/connection';
export default class ConnectionsControllers{
    async index(req: Request, res: Response){
        const totalConnections = await db('connections').count('* as total');
        const { total } = totalConnections[0]
        return res.status(200).json({message: "Success", total})
    }
    async create (req: Request, res: Response) {
        const { id_user } = req.body;
        await db('connections').insert({id_user})
        return res.status(201).json({message: "Success"})
    }
}
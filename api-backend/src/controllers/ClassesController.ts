import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
interface ScheduleItem{
    schedule_class_week_day: number;
    schedule_class_from: string;
    schedule_class_to: string;
}
export default class ClassesController{
    async index(req: Request, res: Response){
        const filters = req.query;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        if(!subject || !week_day || !time){
            let data = await db('classes').join('users', "classes.id_user", '=', 'users.id_user')
            .select(['classes.*', 'users.*']);
            return res.status(200).json(data)
        }
        const timeInMinutes = convertHourToMinutes(time)
        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`id_class` = `classes`.`id_class`')
                .whereRaw('`class_schedule`.`schedule_class_week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`schedule_class_from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`schedule_class_to` > ??', [timeInMinutes])
        })
        .where('classes.class_subject', '=', subject)
        .join('users', "classes.id_user", '=', 'users.id_user')
        .select(['classes.*', 'users.*']);
        res.status(200).json(classes)
    }
    async create (req: Request, res: Response) {
        const {
            user_name,
            user_avatar,
            user_whatsapp,
            user_bio,
            class_subject,
            class_price,
            schedule
        } = req.body;
        const trx = await db.transaction()
        console.log(schedule)
        try {
            let id_user = await trx('users').insert({user_name,user_avatar,user_whatsapp,user_bio})
            let id_class = await trx('classes').insert({class_subject, class_price, id_user})
            let classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    id_class,
                    schedule_class_week_day: scheduleItem.schedule_class_week_day,
                    schedule_class_from: convertHourToMinutes(scheduleItem.schedule_class_from),
                    schedule_class_to: convertHourToMinutes(scheduleItem.schedule_class_to)
                }
            })
            let id_schedule_class = await trx('class_schedule').insert(classSchedule)
            await trx.commit();
            res.status(201).json({message: "User created Successfuly"})        
        } catch (error) {
            await trx.rollback();
            console.log(error)
            res.status(400).json({message: "Error while creating user" + error})
        }       
        
    }
}
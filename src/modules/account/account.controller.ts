import AccountService from './account.service';
import { HttpError } from '../../config/error';
import { IAccountModel } from './account.model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */

export async function signup(req: Request, res: Response, next: NextFunction): Promise <void> {
try {
	const account: IAccountModel = await AccountService.insert(req.body);
	res.status(201).json(account);
} catch (error) {
	next(new HttpError(error.message.status, error.message))
}
}
// export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//     const users: IUserModel[] = await UserService.findAll();

//     res.status(200).json(users);
// } catch (error) {
//     next(new HttpError(error.message.status, error.message));
// }
// }

// /**
//  * @export
//  * @param {Request} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  * @returns {Promise < void >}
//  */
// export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//     const user: IUserModel = await UserService.findOne(req.params.id);

//     res.status(200).json(user);
// } catch (error) {
//     next(new HttpError(error.message.status, error.message));
// }
// }

// /**
//  * @export
//  * @param {Request} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  * @returns {Promise < void >}
//  */
// export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//     const user: IUserModel = await UserService.insert(req.body);

//     res.status(201).json(user);
// } catch (error) {
//     next(new HttpError(error.message.status, error.message));
// }
// }

// /**
//  * @export
//  * @param {Request} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  * @returns {Promise < void >}
//  */
// export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//     const user: IUserModel = await UserService.remove(req.params.id);

//     res.status(200).json(user);
// } catch (error) {
//     next(new HttpError(error.message.status, error.message));
// }
// }

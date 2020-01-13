import * as Joi from 'joi';
import AccountModel, { IAccountModel } from './account.model';
import AccountValidation from './account.validation';
import { IAccountService } from './account.interface';
import { Types } from 'mongoose';


/**
 * @export
 * @implements {IUserModelService}
 */
const AccountService: IAccountService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */

    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
				async insert(body: IAccountModel): Promise < IAccountModel > {
					try {
									const validate: Joi.ValidationResult < IAccountModel > = AccountValidation.createUser(body);

									if (validate.error) {
													throw new Error(validate.error.message);
									}

									const user: IAccountModel = await AccountModel.create(body);

									return user;
					} catch (error) {
									throw new Error(error.message);
					}
	},
};

export default AccountService;

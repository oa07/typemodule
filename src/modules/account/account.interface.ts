import { IAccountModel } from './account.model';

/**
 * @export
 * @interface IAccountService
 */
export interface IAccountService {

    /**
					* @param {IAccountModel} IAccountModel
     * @returns {Promise<IAccountModel[]>}
     * @memberof IUserService
     */

    insert(IAccountModel: IAccountModel): Promise<IAccountModel>;
};


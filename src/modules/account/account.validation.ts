import * as Joi from 'joi';
import Validation from '../validation';
import {IAccountModel } from './account.model';

/**
 * @export
 * @class AccountValidation
 * @extends Validation
 */
class AccountValidation extends Validation {

    /**
     * Creates an instance of UserValidation.
     * @memberof AccountValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IAccountModel} params
     * @returns {Joi.ValidationResult<IAccountModel >}
     * @memberof AccountValidation
     */
    createUser(
        params: IAccountModel
    ): Joi.ValidationResult < IAccountModel > {
        const schema: Joi.Schema = Joi.object().keys({
									firstName: Joi.string()
									.lowercase()
									.required()
									.min(2)
									.max(30),
							lastName: Joi.string()
									.required()
									.lowercase()
									.min(2)
									.max(30),
							email: Joi.string()
									.regex(
											/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									)
									.lowercase()
									.min(3)
									.max(62)
									.required(),
							password: Joi.string()
									.regex(
											/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
									)
									.required(),	
							confirmPassword: Joi.string()
									.valid(Joi.ref('password'))
									.required(),
							contactNo: Joi.string()
									.regex(/^(\+?(880)[0-9]{10})$/)
									.required()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    removeUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new AccountValidation();

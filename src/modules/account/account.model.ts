import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IAccountModel extends Document {
		name: string,
		firstName: string,
		lastName: string,
		email: string,
		birthDate: Date,
		hash: string,
		salt: string,
		password: string,
		role: string,
		accountType: string,
		accountVerified: string,
		contactNo: string,
		gender: string,
		secondaryEmail: string,
		bloodGroup: string,
		location: string,
		about: string,
		skillArea: object[],
		companies: object[],
		token: string,
		resetPasswordToken: string,
		resetPasswordTokenExpiration: string,
		verifyAccountToken: string,
		verifyAccountTokenExpiration: string,
		jobExperience: object[],
		education: object[],
  comparePassword: (password: string) => Promise < boolean > ;
}

// export type AuthToken = {
//     accessToken: string,
//     kind: string
// };

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const AccountSchema: Schema = new Schema({
    
  name: {
			type: String,
			trim: true,
			unique: true,
	},
	firstName: {
			type: String,
			trim: true,
			required: true,
	},
	lastName: {
			type: String,
			trim: true,
			required: true,
	},
	email: {
			type: String,
			unique: true,
			required: true,
	},
	birthDate: {
			type: Date,
	},
	hash: String,
	salt: String,
	password: {
			type: String,
			required: true,
	},
	role: {
			type: String,
			enum: ['guest', 'admin', 'company', 'user'],
			default: 'user',
	},
	accountType: {
			type: String,
			enum: ['premium', 'normal'],
			default: 'normal',
	},
	accountVerified: {
			type: Boolean,
			default: false,
	},
	contactNo: {
			type: String,
			required: false,
			unique: true,
	},
	gender: {
			type: String,
			description: 'can be male,female & others',
			enum: ['male', 'female', 'others'],
	},
	// it must be empty
	// if null, it will create an duplicateError
	secondaryEmail: {
			type: String,
			lowercase: true,
			unique: false,
			trim: true,
	},
	bloodGroup: {
			type: String,
			enum: ['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-'],
	},
	location: {
			type: String,
			trim: true,
	},
	about: {
			type: String,
			max: 200,
			trim: true,
	},
	skillArea: [
			{
					type: Schema.Types.ObjectId,
					ref: 'SkillArea',
			},
	],
	companies: [
			{
					type: Schema.Types.ObjectId,
					ref: 'Company',
			},
	],
	token: {
			type: String,
	},
	resetPasswordToken: {
			type: String,
	},
	resetPasswordTokenExpiration: {
			type: String,
	},
	verifyAccountToken: {
			type: String,
	},
	verifyAccountTokenExpiration: {
			type: String,
	},
	jobExperience: [
			{
					type: Schema.Types.ObjectId,
					ref: 'Jobexperience',
			},
	],
	education: [
			{
					type: Schema.Types.ObjectId,
					ref: 'Education',
			},
	],
}, {
    collection: 'usermodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
AccountSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};


export default connections.db.model < IAccountModel > ('Account', AccountSchema);

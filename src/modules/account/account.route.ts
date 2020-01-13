import { Router } from 'express';
import { AccountComponent } from '../index';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/users
 * 
 * @swagger
 * /api/v1/users:
 *   get:
 *     description: Get all stored users in Database
 *     tags: ["users"]
 *     security:
 *      - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Users'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
// router.get('/', AccountComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/users
 * 
 * @swagger
 * /api/v1/users:
 *   post:
 *      description: Create new User
 *      tags: ["users"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSchema'
 *            example:
 *              name: userName
 *              email: test.user@mail.com
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/signup', AccountComponent.signup);

/**


/**
 * @export {express.Router}
 */
export default router;

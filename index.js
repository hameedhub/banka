/**
 * @swagger
 * definitions:
 *   SignUp:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       type:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *   SignUpResponse:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *   ErrorObject:
 *     properties:
 *       status:
 *         type: number
 *       error:
 *         type: string
 */

 /**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - SignUp
 *     description: SignUp users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: signup
 *         description: user details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Response'
 *     responses:
 *       200:
 *         description: User successfully signup
 *         schema:
 *           $ref: '#defintions/SignUp'
 *       404:  
 *         description: Error 
 *         schema:
 *             $ref: '#/definitions/ErrorObject'
 */
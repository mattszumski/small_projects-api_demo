const express = require("express");
const { check } = require("express-validator");
const {
  getAllQuotesRequest,
  getQuoteById,
  addNewQuote,
  editQuote,
  deleteQuote,
  getQuoteByAuthor,
} = require("../controllers/quotesController");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Quote:
 *          type: object
 *          required:
 *              - quote
 *              - author
 *          properties:
 *              id:
 *                  type: string
 *                  description: Id of the quote from Database
 *              quote:
 *                  type: string
 *                  description: The quote text
 *              author:
 *                  type: String
 *                  description: The quote's author
 *              createdAt:
 *                  type: Date
 *                  description: Date and Time when the quote was added to Database in ISO date format.
 *              modifiedAt:
 *                  type: Date
 *                  description: Date and Time when the quote was last modified in ISO date format.
 *          example:
 *                id: 62efe4f29a85d0a4a9d18cfe
 *                quote: 'There are three kinds of lies: Lies, Damned Lies, and Statistics.'
 *                author: Mark Twain
 *
 */

/**
 * @swagger
 * tags:
 *  name: Quotes
 *  description: Quotes API
 */

/**
 * @swagger
 * /quote/:
 *  get:
 *      summary: Returns list of all the quotes
 *      tags: [Quotes]
 *      responses:
 *          200:
 *              description: List of all the quotes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Quote'
 *
 */
router.get("/", getAllQuotesRequest);

/**
 * @swagger
 * /quote/searchByAuthor/:
 *  post:
 *    summary: Returns list of the quotes by given author
 *    tags: [Quotes]
 *    requestBody:
 *        required: true
 *        name: author
 *        description: Author's name to search
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - author
 *              properties:
 *                author:
 *                  type: String
 *                  description: The quote's author
 *              example:
 *                author: Winston
 *    responses:
 *      200:
 *        description: Array of found quotes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Quote'
 *      400:
 *        description: No Parameters with name 'Author', or empty value of the parameter 'Author'
 */

router.post(
  "/searchByAuthor",
  [check("author").isLength({ min: 1 }).trim().escape()],
  getQuoteByAuthor
);

/**
 * @swagger
 * /quote/{id}:
 *  get:
 *    summary: Returns the quote with given id
 *    tags: [Quotes]
 *    parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: Id of the quote
 *    responses:
 *          200:
 *              description: Data regarding quote with given id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Quote'
 *          404:
 *              description: Quote with given id has not been found
 */

router.get("/:id", getQuoteById);

/**
 * @swagger
 * /quote/:
 *  post:
 *    summary: Adds new quote to the database
 *    tags: [Quotes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Quote'
 *    responses:
 *      201:
 *        description: Information that quote has been successfully added to the database
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Quote'
 *      400:
 *        description: Missing or incorrect data in the request
 */

router.post(
  "/",
  [
    check("author").isLength({ min: 1 }).trim().escape(),
    check("quote").isLength({ min: 1 }).trim().escape(),
  ],
  addNewQuote
);

/**
 * @swagger
 * /quote/{id}:
 *  put:
 *    summary: Edits the quote with given id
 *    tags: [Quotes]
 *    parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: Id of the quote
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Quote'
 *    responses:
 *          200:
 *              description: Quote has been successfully modified
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Quote'
 *          404:
 *              description: Quote with given id has not been found or missing data in the request
 */
router.put(
  "/:id",
  [
    check("author").isLength({ min: 1 }).trim().escape(),
    check("quote").isLength({ min: 1 }).trim().escape(),
  ],
  editQuote
);

/**
 * @swagger
 * /quote/{id}:
 *  delete:
 *    summary: Deletes the quote with given id
 *    tags: [Quotes]
 *    parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: Id of the quote
 *    responses:
 *          204:
 *              description: Quote has been successfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Quote'
 *          400:
 *              description: Quote with given id has not been found
 */
router.delete("/:id", deleteQuote);

module.exports = router;

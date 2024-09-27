//? await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schemas.

//* https://github.com/colinhakcs/zod#parseasync

//? `.parse(data: unknown): T`

//? Given any Zod schema, you can call its `.parse` method to check `data` is valid. if it is, a value is returned with full type information! Otherwise, an error it thrown.

//? `.parseAsync(data: unknown): Promise<>`

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const status = 422;
    const message = "Fill the input properly!";
    const extraDetails = error.errors[0].message;
    const err = {
      status,
      message,
      extraDetails,
    };
    console.log(msg);
    // res.status(400).json({ msg: msg });
    next(err);
  }
};

module.exports = validate;

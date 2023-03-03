import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(6).required(),
    plan: Joi.string().required(),
    subscription: Joi.string().required(),
    addOns: Joi.array().has(Joi.string().required()),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  res.status(200).json({ success: true });
}

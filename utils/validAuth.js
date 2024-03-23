export const validAuth = (user, isSchema) => {
  const { error } = isSchema.validate(user, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(400).json({ messages: errors });
  }
};

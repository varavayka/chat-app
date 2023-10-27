function typeBody({ body }) {
  const { email, password } = body;
  return typeof body === "object" ? body : JSON.parse({ email, password });
}

module.exports = typeBody;

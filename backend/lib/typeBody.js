function typeBody({ body }) {
  if(body?.username) {
    return typeof body === "object" ? body : JSON.parse(body);
  }
  const { email, password } = body;
  return typeof body === "object" ? body : JSON.parse({ email, password });
}

module.exports = typeBody;

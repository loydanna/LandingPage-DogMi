export function validateName(name) {
  const v = name.trim();
  if (!v) return "Nome é obrigatório.";
  if (v.length < 2) return "Nome deve ter pelo menos 2 caracteres.";
  if (!/^[\p{L}][\p{L}\s'’-]*$/u.test(v)) return "Nome inválido.";
  return "";
}

export function validateEmail(email) {
  const v = email.trim();
  if (!v) return "Email é obrigatório.";
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  if (!ok) return "Digite um email válido (ex: nome@dominio.com).";
  return "";
}
import background1 from "../assets/background1.svg";
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import { useMemo, useState } from "react";
import { validateEmail, validateName } from "../utils/validators";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({ open: false, msg: "" });

  const errors = useMemo(() => {
    return {
      name: validateName(name),
      email: validateEmail(email),
    };
  }, [name, email]);

  const isValid = !errors.name && !errors.email;

  const showNameError = touched.name && !!errors.name;
  const showEmailError = touched.email && !!errors.email;

  const resetForm = () => {
    setName("");
    setEmail("");
    setTouched({ name: false, email: false });
  };

  const openToast = (msg) => {
    setToast({ open: true, msg });
    window.setTimeout(() => setToast({ open: false, msg: "" }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true });

    if (!isValid) return;

    setSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 700));

      openToast("Cadastro realizado com sucesso! ✅");
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {toast.open && (
        <div
          role="status"
          aria-live="polite"
          className="
            fixed top-6 left-1/2 -translate-x-1/2 z-50
            rounded-2xl border border-white/15
            bg-emerald-500/15 text-emerald-50
            backdrop-blur px-5 py-3 shadow-xl
          "
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">✨</span>
            <p className="font-medium">{toast.msg}</p>
          </div>
        </div>
      )}
      <main className="flex flex-row justify-center text-center min-h-screen ">
        <div
          className="flex flex-col items-center justify-between bg-cover w-full"
          style={{ backgroundImage: `url(${background1})` }}
        >
          <h1 className="w-87.5 mt-20 font-semibold text-[96px] text-[#544236] bg-[#FCF4C6] p-2 rounded-full mx-10">
            Black Friday
          </h1>
          <h2 className="text-white text-[64px] mb-10">Em Breve...</h2>
        </div>
        <div className="relative w-full text-center items-center bg-[#D9C9B2] p-10">
          <img
            src={image1}
            alt=""
            aria-hidden
            className="absolute top-0 right-0 object-cover z-0"
          />

          <img
            src={image2}
            alt=""
            aria-hidden
            className="absolute bottom-0 right-0 object-cover z-0"
          />
          <h1 className="relative z-10 text-[#544236] font-bold text-[50px] mx-20 my-10">
            Cadastre-se para Receber nossas Ofertas
          </h1>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative z-10 flex flex-col text-start bg-[#F7E4C3] mx-20 gap-2 p-10 rounded-xl drop-shadow-xl"
            action=""
          >
            <label className="text-[#544236] text-[18px]" htmlFor="name">
              Nome:
            </label>
            <input
              className={`bg-white rounded-xl p-2 mb-5 border
              outline-none transition
              ${
                showNameError
                  ? "border-red-400/70 focus:border-red-400"
                  : "border-white/10 focus:border-white/30"
              }
              focus:ring-2 focus:ring-white/10`}
              value={name}
              type="text"
              id="name"
              placeholder="Escreva seu nome"
              name="name"
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              autoComplete="name"
              aria-invalid={showNameError ? "true" : "false"}
              aria-describedby={showNameError ? "name-error" : undefined}
            />
            <p
              id="name-error"
              role="alert"
              className={`text-sm text-red-300 ${
                showNameError ? "block" : "hidden"
              }`}
            >
              {errors.name}
            </p>

            <label className="text-[#544236] text-[18px]" htmlFor="email">
              Email:
            </label>
            <input
              className={`bg-white rounded-xl p-2 mb-5 border
              outline-none transition
              ${
                showEmailError
                  ? "border-red-400/70 focus:border-red-400"
                  : "border-white/10 focus:border-white/30"
              }
              focus:ring-2 focus:ring-white/10`}
              value={email}
              type="email"
              id="email"
              placeholder="exemplo@email.com"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              autoComplete="email"
              inputMode="email"
              aria-invalid={showEmailError ? "true" : "false"}
              aria-describedby={showEmailError ? "email-error" : undefined}
            />

            <p
              id="email-error"
              role="alert"
              className={`text-sm text-red-300 ${
                showEmailError ? "block" : "hidden"
              }`}
            >
              {errors.email}
            </p>
            <button
              disabled={!isValid || submitting}
              className="bg-[#D9B7B5] font-bold text-[#544236] rounded-3xl py-3 mx-20 mt-10
                    transition-all cursor-pointer duration-300 ease-out
                    hover:bg-[#cfa9a6]
                    hover:-translate-y-1
                    hover:shadow-lg
                    active:translate-y-0

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#544236]/40"
              type="submit"
            >
              Cadastre-se
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

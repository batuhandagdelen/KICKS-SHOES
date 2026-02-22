import { Form, Formik } from "formik";
import { type FC } from "react";
import Input from "../../components/form/input";
import { Link } from "react-router-dom";
import { REGISTER_INITIAL_VALUES } from "../../constants";
import { REGISTER_SCHEMA } from "../../constants/schema";
import { useRegister } from "../../service/auth";
import type { RegisterFormValues } from "../../types";
const Register: FC = () => {
  const { mutate, isPending } = useRegister();

  const handleSubmit = (values: RegisterFormValues) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center spacing">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <img src="/logo.svg" alt="logo" className="mx-auto h-10 w-auto" />

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Aramıza Katılın
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Formik
          initialValues={REGISTER_INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={REGISTER_SCHEMA}
        >
          <Form className="space-y-8">
            <Input label="Adınız" name="firstName" />
            <Input label="Soyadınız" name="lastName" />
            <Input label="E-Posta" name="email" type="email" />
            <Input label="Şifre" name="password" />
            <Input label="Şifre Tekrarı" name="confirmPassword" />
            <Input
              label="Kullanıcı Sözleşmesini Okudum Onaylıyorum"
              name="terms"
              type="checkbox"
            />

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500 shadow-sm"
              >
                Hesap Oluştur
              </button>
            </div>
          </Form>
        </Formik>

        <div className="mt-10 text-center text-sm/6 text-gray-500 ">
          Hesabınız var Mı?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

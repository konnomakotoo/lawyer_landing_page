import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from 'yup'
import { useLocation, useNavigate } from "react-router-dom"
import type { AppDispatch } from "../redux/store/redux.store";
import { fetchSignUpUser } from "../redux/slices/userSlice";
import { useState } from "react";
import { FormTitle, FormWrapper, StyledButton, StyledForm, StyledInput } from "../ui-kit/Form";

export type ServerError = {
    error: string;
    message: string;
    response: {
        data: string;
    };
  };

const schema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  email:  yup.string().required('Email обязательно').email('Неверный формат email'),
  lastName: yup.string().required('Фамилия обязательна').min(2).max(50),
  phoneNumber: yup
    .string()
    .required('Телефон обязателен')
    .matches(/^\+?\d{10,15}$/, 'Неверный формат телефона'),
  password:  yup.string().required('Password обязательно').min(6, 'Минимум 6 символов')
            .matches(/[a-z]/, 'Минимум 1 строчная буква')
            .matches(/[A-Z]/, 'Минимум 1 заглавная буква')
            .matches(/[@$!%*?&#]/, 'Минимум 1 спецсимвол'),
  confirmPassword: yup.string().required('ConfirmPassword обязательно').oneOf([yup.ref('password')], 'Пароли должны совпадать'),
})
type FormData = yup.InferType<typeof schema>

const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const {register, handleSubmit, setError, formState : {errors}} = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const [showPassword, setShowPassword] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);


    const onSubmit = async (data: FormData) => {
        try {
          await dispatch(fetchSignUpUser(data)).unwrap();
          navigate(from, { replace: true });
        } catch (err) {
        const error = err as ServerError
        const errorMsg = error?.error || error?.message || error?.response?.data
        if (errorMsg === "Rejected") {
            setError("email", {
            type: "manual",
            message: "Пользователь с таким email уже существует",
        });
    }
}
};

    return (
        <FormWrapper>
          <FormTitle>Регистрация</FormTitle>
          <StyledForm onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <StyledInput
              type="text"
              placeholder="Имя пользователя"
              {...register("name")}
            />
            <p className="auth-error">{errors.name?.message}</p>
            <StyledInput placeholder="Фамилия" {...register('lastName')} />
            {errors.lastName && <p className="auth-error">{errors.lastName.message}</p>}
            <StyledInput type="text" placeholder="Почта" {...register("email")} />
            <p className="auth-error">{errors.email?.message}</p>
            <StyledInput placeholder="+7XXXXXXXXXX" {...register('phoneNumber')} />
            {errors.phoneNumber && <p className="auth-error">{errors.phoneNumber.message}</p>}
            <StyledInput
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              {...register("password", {
                onChange: (e) => {
                  setPasswordEntered(e.target.value.length > 0);
                },
              })}
            />
            <p className="auth-error">{errors.password?.message}</p>
            <StyledInput
              type={showPassword ? "text" : "password"}
              placeholder="Повторите пароль"
              {...register("confirmPassword")}
            />
            <p className="auth-error">{errors.confirmPassword?.message}</p>
            {passwordEntered && (
              <span
                className="toggle-register-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{cursor: 'pointer'}}
              >
                {showPassword ? "🙈 Скрыть" : "👁️ Показать"}
              </span>
            )}
            <StyledInput className="signup-button" type="submit" value="Отправить" />
            <StyledButton
              className="signup-button"
              onClick={() => navigate("/login")}
              style={{ color: "black" }}
            >
              Уже зарегистрирован
            </StyledButton>
          </StyledForm>
          </FormWrapper>
    );
}

export default SignUp;
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import { useNavigate, useLocation } from "react-router-dom";
import type { AppDispatch } from "../redux/store/redux.store";
import { fetchLoginUser } from "../redux/slices/userSlice";
import { useState } from "react";
import { FormTitle, FormWrapper, StyledButton, StyledForm, StyledInput } from "../ui-kit/Form";


interface ServerError {
  error?: string;
  message?: string;
  response?: {
    data?: { error?: string, message?: string };
  };
}


const schema = yup.object({
  email: yup.string().required('Email обязательно').email('Неверный формат email'),
  password: yup.string().required('Password обязательно'),
});

type FormData = yup.InferType<typeof schema>;

const Login: React.FC = () => {
const [showPassword, setShowPassword] = useState(false);
const [passwordEntered, setPasswordEntered] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [serverError, setServerError] = useState<string | null>(null);
  

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
        setServerError(null);
      await dispatch(fetchLoginUser(data)).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      console.log("Ошибка:", err);
      
      const error = err as ServerError;
      const errorMessage = 
        typeof error === 'string' 
          ? error 
          : error?.response?.data?.error || 
            error?.response?.data?.message || 
            error?.message || 
            "Ошибка входа";
  
      setServerError(errorMessage);
    }
  };


    return (
      <FormWrapper>
          <FormTitle>Вход в аккаунт</FormTitle>
          <StyledForm className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <StyledInput type="text" placeholder="Почта" {...register("email")} />
            <p className="auth-error">{errors.email?.message}</p>

            <StyledInput
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              {...register("password")}
              onChange={(e) => setPasswordEntered(e.target.value.length > 0)}
            />
            <br />
            {passwordEntered && (
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈 Скрыть" : "👁️ Показать"}
              </span>
            )}

            <p className="auth-error">{errors.password?.message}</p>
            {serverError && <p style={{ color: "red" }}>{serverError}</p>}
            <StyledInput type="submit" value="Отправить" />
            <StyledButton
              className="signup-button"
              onClick={() => navigate("/signup")}
            >
              Регистрация
            </StyledButton>
          </StyledForm>
        </FormWrapper>
    );
}

export default Login;


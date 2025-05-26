import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import { useNavigate, useLocation } from "react-router-dom";
import type { AppDispatch } from "../redux/store/redux.store";
import { fetchLoginUser } from "../redux/slices/userSlice";
import { useState } from "react";
import { FormTitle, FormWrapper, Icon, IconEye, InputWrapper, StyledButton, StyledError, StyledForm, StyledInput } from "../ui-kit/Form";
import MailIcon from "../Icons/MailIcon";
import EyeClosedIcon from "../Icons/EyeClosedIcon";
import EyeOpenIcon from "../Icons/EyeOpenIcon";
import LockedIcon from "../Icons/LockedIcon";


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
            <InputWrapper>
              <Icon><MailIcon /></Icon>
              <StyledInput type="text" placeholder="Почта" {...register("email")} />
              </InputWrapper>
              {errors.email && <StyledError>{errors?.email?.message}</StyledError>}
            <InputWrapper>
              <Icon><LockedIcon /></Icon>
              <StyledInput
                 type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  {...register("password")}
               />
                <IconEye onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}</IconEye>
            </InputWrapper>
            {errors.password && <StyledError>{errors?.password?.message}</StyledError>}
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


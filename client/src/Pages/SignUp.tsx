import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from 'yup'
import { useLocation, useNavigate } from "react-router-dom"
import type { AppDispatch } from "../redux/store/redux.store";
import { fetchSignUpUser } from "../redux/slices/userSlice";
import { useState } from "react";
import { FormTitle, FormWrapper, Icon, IconEye, InputWrapper, StyledButton, StyledError, StyledForm, StyledInput, StyledLine, StyledLineOr, StyledOr, StyledText, StyledtextClicked, StyledTextContainer } from "../ui-kit/Form";
import PersonIcon from "../Icons/PersonIcon";
import MailIcon from "../Icons/MailIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import LockedIcon from "../Icons/LockedIcon";
import EyeClosedIcon from "../Icons/EyeClosedIcon";
import EyeOpenIcon from "../Icons/EyeOpenIcon";

export type ServerError = {
    error: string;
    message: string;
    response: {
        data: string;
    };
  };

const schema = yup.object({
  name: yup.string().required('Введите имя!').min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  email:  yup.string().required('Введите email!').email('Неверный формат email'),
  lastName: yup.string().required('Введите фамилию!').min(2).max(50),
  phoneNumber: yup
    .string()
    .required('Введите номер телефона!')
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

// const handleGoogleSignup = () => {
//     // редиректим на эндпоинт бэка, который стартует Google OAuth
//     window.location.href = '/api/auth/google';
//   };

    return (
        <FormWrapper>
          <FormTitle>Регистрация</FormTitle>
          <StyledForm onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <InputWrapper>
            <Icon><PersonIcon /></Icon>
            <StyledInput type="text" placeholder="Имя пользователя" {...register("name")}/>
            </InputWrapper>
            {errors.name && <StyledError>{errors?.name?.message}</StyledError>}
            <InputWrapper>
            <Icon><PersonIcon /></Icon>
            <StyledInput placeholder="Фамилия" {...register('lastName')} />
            </InputWrapper>
            {errors.lastName && <StyledError>{errors.lastName.message}</StyledError>}
            <InputWrapper>
            <Icon><MailIcon /></Icon>
            <StyledInput type="text" placeholder="Почта" {...register("email")} />
            </InputWrapper>
            {errors.email && <StyledError>{errors?.email?.message}</StyledError>}
            <InputWrapper>
            <Icon><PhoneIcon /></Icon>
            <StyledInput placeholder="+7XXXXXXXXXX" {...register('phoneNumber')} defaultValue="+7"/>
            </InputWrapper>
            {errors.phoneNumber && <StyledError>{errors.phoneNumber.message}</StyledError>}
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
            <InputWrapper>
            <Icon><LockedIcon /></Icon>
            <StyledInput
              type={showPassword ? "text" : "password"}
              placeholder="Повторите пароль"
              {...register("confirmPassword")}
            />
            <IconEye onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}</IconEye>
            </InputWrapper>
            {errors.confirmPassword && <StyledError>{errors?.confirmPassword?.message}</StyledError>}
            <StyledButton  type="submit">Отправить </StyledButton>
            <StyledLineOr>
              <StyledLine />
              <StyledOr>OR</StyledOr>
              <StyledLine />
            </StyledLineOr>
            <StyledTextContainer>
              <StyledText>Уже зарегестрирован?</StyledText>
              <StyledtextClicked onClick={() => navigate("/login")}>Войти</StyledtextClicked>
            </StyledTextContainer>
            {/* <div onClick={handleGoogleSignup}>
            <GoogleIcon />
            </div> */}
          </StyledForm>
          </FormWrapper>
    );
}

export default SignUp;
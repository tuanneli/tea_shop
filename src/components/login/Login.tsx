import React, {useEffect, useState} from 'react';

interface IValidation {
    isEmpty: boolean,
    minLength: number,
}

const useInput = (initialValue: string, validation: IValidation) => {
    const [value, setValue] = useState<string>(initialValue);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const valid = useValidation(value, validation);

    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    const onBlur = (e: any) => {
        setIsDirty(true);
    }

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        ...valid
    }
};

const useValidation = (value: string, validationList: IValidation) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');

    useEffect(() => {
        for (const validation in validationList) {
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    setErrorText("Это поле обязательно");
                    break;
                case 'minLength':
                    value && value.length < validationList[validation] ? setMinLengthError(true) : setMinLengthError(false);
                    isEmpty && setErrorText("Слишком мало символов");
                    break;
            }
        }
    }, [value]);

    return {
        isEmpty,
        minLengthError,
        errorText,
    }
};

const Login = () => {
    const name = useInput('', {isEmpty: true, minLength: 3});
    const phone = useInput('', {isEmpty: true, minLength: 5});

    return (
        <>
            <form>
                <h1>Регистрация</h1>
                {(name.isDirty && (name.isEmpty || name.minLengthError)) &&
                    <div style={{color: 'red'}}>{name.errorText}</div>}
                <input value={name.value} onChange={name.onChange} onBlur={name.onBlur} name="name" type="text"
                       placeholder={"Введите имя..."}/>
                <input value={phone.value} onChange={phone.onChange} onBlur={phone.onBlur} name="phone" type="text"
                       placeholder={"Введите номер телефона..."}/>
                <button type={"submit"}>Подтвердить</button>
            </form>
        </>
    );
};

export default Login;
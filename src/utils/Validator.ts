export enum ValidationType {
  Email = 'email',
  Name = 'name',
  Login = 'login',
  Password = 'password',
  PasswordConfirm = 'password_confirm',
  Phone = 'phone',
}

class Validator {
  protected formData: FormData | undefined;

  constructor() {
    this.formData = undefined;
  }

  login(value: string): [boolean, string] {
    return [
      /^[a-zA-Z0-9]+$/.test(value),
      'Логин должен состояить из латинских букв и цифр',
    ];
  }

  password(value: string): [boolean, string] {
    return [
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        value
      ),
      'Пароль должен содержать одну заглавную букву, одну цифру и спецсимвол (!@#$%^&*)',
    ];
  }

  passwordConfirm(value: string): [boolean, string] {
    return [
      this.formData?.get('newPassword') === value,
      'Пароль должен совпадать',
    ];
  }

  email(value: string): [boolean, string] {
    return [/\S+@\S+\.\S+/.test(value), 'Некорректный адрес почты'];
  }

  name(value: string): [boolean, string] {
    return [
      /^[A-ZА-Яa-zа-я ]+$/.test(value),
      'Допустимы символы латиницы и кириллицы',
    ];
  }

  phone(value: string): [boolean, string] {
    return [/\+?[0-9]{10,15}/.test(value), 'Некорректный номер телефона'];
  }

  validate(
    type: ValidationType,
    value: string,
    formData?: FormData
  ): [boolean, string] {
    this.formData = formData;
    switch (type) {
      case ValidationType.Email:
        return this.email(value);
      case ValidationType.Login:
        return this.login(value);
      case ValidationType.Name:
        return this.name(value);
      case ValidationType.Password:
        return this.password(value);
      case ValidationType.PasswordConfirm:
        return this.passwordConfirm(value);
      case ValidationType.Phone:
        return this.phone(value);
      default:
        return [!!value.length, 'Значение не должно быть пустым'];
    }
  }
}

export default new Validator();

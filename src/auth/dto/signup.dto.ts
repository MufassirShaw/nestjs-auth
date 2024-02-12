import { IsEmail, Matches, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  readonly email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  // Regx breakdown
  // ^(?=.*[a-zA-Z]) - starts with at least one character
  // (?=.*\d) - contains at least one number
  // (?=.*[@$!%*?&]) -contains one special char
  // [A-Za-z\d@$!%*?&] - Can have additional characters from the set [A-Za-z\d@$!%*?]
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and 1 special character',
  })
  readonly password: string;
}

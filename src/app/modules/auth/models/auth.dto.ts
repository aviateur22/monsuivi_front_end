export interface ILoginResponseDto {
    jwt: string,
    id: string,
    roles: string[],
    responseMessage: string
}

export interface ILoginDto {
  email: string,
  password: string
}

export interface IRegsiterDto {
  email: string,
  nickname: string,
  password: string
}

export interface IRegsiterResponseDto {
   responseMessage: string
}


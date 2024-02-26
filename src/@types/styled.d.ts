import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components'{
  export interface DefaultTheme extends ThemeType{}
}

// sobrescrevendo a bibloteca adicionando os themas criados no import { defaultTheme } from '../styles/themes/default'
// para que o TS cosiga vincular os themas criados para o dev conseguir recuperar
// dentro dos styled-components criados
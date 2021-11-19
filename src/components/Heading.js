import styled from 'styled-components'
import { 
    compose, 
    color, 
    shadow, 
    space, 
    border, 
    typography, 
    layout 
} from 'styled-system'

export const Heading = styled.h6`
    ${compose(color, shadow, space, border, typography, layout)}
`

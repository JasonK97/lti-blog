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

export const Text = styled.p`
    ${compose(color, shadow, space, border, typography, layout)}
`

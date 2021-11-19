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

export const Box = styled.div`
    ${compose(color, shadow, space, border, typography, layout)}
`

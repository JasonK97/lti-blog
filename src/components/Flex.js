import styled from 'styled-components'
import { 
    compose, 
    color, 
    shadow, 
    space, 
    border, 
    typography, 
    flexbox,
    layout 
} from 'styled-system'

export const Flex = styled.div`
    ${compose(color, shadow, space, border, typography, flexbox, layout)}
    display: flex;
`

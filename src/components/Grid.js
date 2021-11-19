import styled from 'styled-components'
import { 
    compose, 
    color, 
    shadow, 
    space, 
    border, 
    typography,
    grid,
    layout 
} from 'styled-system'

export const Grid = styled.div`
    ${compose(color, shadow, space, border, typography, grid, layout)}
`

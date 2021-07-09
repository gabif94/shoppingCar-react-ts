import { Button } from '@material-ui/core'

import { CartItemType } from '../App'

import { Wrapper } from './Item.styles'

type Props = {
    item: CartItemType
    HanddleAddToCart: (clickedItem: CartItemType) => void

}

const Item: React.FC<Props> = ({ item, HanddleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${ item.price}</h3>
        </div>
        <Button onClick={() => HanddleAddToCart(item) }>Add to cart</Button>
    </Wrapper>
)

export default Item
import { useState } from 'react'
import { useQuery } from 'react-query'

import { LinearProgress, Drawer, Grid, Badge } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddSharp'

import { Wrapper, StyledButton } from './App.styles'

import Item from './Item/Item'
import Cart from './Cart/Cart';


export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => await(await fetch('https://fakestoreapi.com/products')).json()




function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  
  console.log(data)

  const getTotalItems = (items: CartItemType[]) => items.reduce((acum: number, item) => acum + item.amount, 0)

  const HanddleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(newItem => {
      const isItemInCart = newItem.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return newItem.map(item => 
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        )
      }
      return [...newItem, {...clickedItem, amount: 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(deletedItem => (
      deletedItem.reduce((acum, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acum
          return [...acum, {...item, amount: item.amount - 1}]
        } else {
          return [...acum, item]
        }
      }, [] as CartItemType[])
    ))
  }
  
  if (isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={HanddleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} HanddleAddToCart={HanddleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;

import { FC } from 'react'
import { Slide } from 'react-slideshow-image'
import styles from './ProductSlideshow.module.css'

interface Props {
  images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
      easing='ease'
      duration={ 5000 }
      indicators
    >
      {
        images.map((image, index) => {
          const url = `/products/${ image }`

          return (
            <div key={ index } className={ styles['each-slide'] }>
              <div style={{ backgroundImage: `url(${ url })`, backgroundSize: 'cover' }} />
            </div>
          )
        })
      }
    </Slide>
  )
}

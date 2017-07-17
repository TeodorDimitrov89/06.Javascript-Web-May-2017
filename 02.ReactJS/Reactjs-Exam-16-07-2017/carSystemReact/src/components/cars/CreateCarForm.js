import React from 'react'
import Input from '../common/forms/Input'

const CreateHotelForm = (props) => (
  <div className='container'>
    <form>
      <div className='error'>{props.error}</div>
      <Input
        name='make'
        value={props.car.make}
        placeholder='Make'
        onChange={props.onChange} />
      <br />
      <Input
        name='model'
        value={props.car.model}
        placeholder='Model'
        onChange={props.onChange} />
      <br />
      <Input
        name='year'
        type='number'
        value={props.car.year}
        placeholder='Year'
        onChange={props.onChange} />
      <br />
      <Input
        name='engine'
        value={props.car.engine}
        placeholder='Engine'
        onChange={props.onChange} />
      <br />
      <Input
        name='price'
        value={props.car.price}
        placeholder='Price'
        onChange={props.onChange} />
      <br />
      <Input
        name='image'
        value={props.car.image}
        placeholder='Image'
        onChange={props.onChange} />
      <br />
      <Input
        name='mileage'
        type='number'
        value={props.car.mileage}
        placeholder='Mileage'
        onChange={props.onChange} />
      <br />
      <input type='submit' value='add' onClick={props.onSave} />
      <br />
    </form>
  </div>
)

export default CreateHotelForm

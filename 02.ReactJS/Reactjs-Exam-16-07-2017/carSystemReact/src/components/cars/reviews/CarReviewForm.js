import React from 'react'

import Input from '../../common/forms/Input'

const CarReviewForm = (props) => (
  <div className='container'>
    <form>
      <div className='error'>{props.error}</div>
      <Input
        name='rating'
        type='number'
        value={props.review.rating}
        placeholder='Rating'
        onChange={props.onChange} />
      <br />
      <Input
        name='comment'
        placeholder='Comment'
        value={props.review.comment}
        onChange={props.onChange} />
      <br />
      <input type='submit' value='add' onClick={props.onSave} />
      <br />
    </form>
  </div>
)

export default CarReviewForm

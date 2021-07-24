import React from 'react'

const CategoriesCard = ( { name }) => {

  // Function for replacing '-' inside of category name. In some cases there are multiples of them.
  const changeLookOfCategory = (nameVariable) => {
    const newCategoryName = nameVariable.replace(/#|-/g, ' ')
    return newCategoryName
  }

  return (

    <> 
      <h4>{changeLookOfCategory(name)}</h4>
    </>

  )
}

export default CategoriesCard


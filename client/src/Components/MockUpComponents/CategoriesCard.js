import React from 'react'

const CategoriesCard = ( { name }) => {

  // Function for replacing '-' inside of category name. In some cases there are multiples of them.
  // const changeLookOfCategory = (nameVariable) => {
  //   const newCategoryName = nameVariable.replace(/#|-/g, ' ')
  //   return newCategoryName
  // }

  return (

    <> 
      <a href={`/categories/${name}`}><h4>{name}</h4></a>
    </>

  )
}

export default CategoriesCard


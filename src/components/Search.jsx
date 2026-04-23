import React from 'react'

export default function Search({handleSearch}) {

  // This is a controlled component, so we need to keep track of the search term in state
  const [search, setSearch] = React.useState('')

  // This function will be called whenever the user types in the search box
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch(e.target.value)
    // Call the handleSearch function that was passed in as a prop; this will pass the search term back up to the parent component (CardList) where it can be used to filter the cards
    handleSearch(value)
  }

  return (
    <form class="pt4 pb4 pl2 black-80">
      <fieldset class="cf bn ma0 pa0">
        <div class="cf measure mb2">
          <input class="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder='Tag Search' value={search} onChange={handleChange} type="text" />
        </div>
        <small id="name-desc" class="f6 black-60 db mb2">Enter a keyword to filter by tags</small>
    </fieldset>
    </form>
  )
}

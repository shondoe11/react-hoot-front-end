# React Hoot Notes

## HootList

list -> fetch -> map JSX

- useState -> App
- service

## Lifting state

- App (state -> hoots + addToHoots -> fetch -> POST)
  - HootForm -> addToHoots as props
  - HootsList -> hoots as props

`/hoots/:hootId/comments/new`

import { gql, useQuery } from '@apollo/client'
import React from 'react'


const ME_QUERY = gql`
query meQuery {
  me {
    id
    email
    role
  }
}
`


export const useMe = () => {
  return useQuery(ME_QUERY);
   
}
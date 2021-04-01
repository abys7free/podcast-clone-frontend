import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router'

import { getAllPodcastsQuery } from '../../__generated__/getAllPodcastsQuery'


const PODCASTS_QUERY = gql`
  query getAllPodcastsQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        id
        title
        category
        rating
      }
    }
  }
`


export const Podcasts = () => {
  const { data, loading } = useQuery<getAllPodcastsQuery>(PODCASTS_QUERY)
  console.log(data?.getAllPodcasts.podcasts);
  const history = useHistory();
  const onClick = () => {
    history.push('/:podcastId')
  }
  return (
    <div>
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      {!loading && (
        <div className="h-screen border-double">
          <div className="flex flex-col">
            {data?.getAllPodcasts.podcasts?.map((podcast) => (
              <div
                key={podcast.id}
                
                >
                <div
                  className="text-white pl-3 pt-3 pb-20 border-t border-b border-gray-200"
                >
                  <span onClick={onClick} className="cursor-pointer hover:underline">{podcast.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  )
}
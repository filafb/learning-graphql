import React, { Component } from 'react';
import Link from './Link';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });
    const votedLink = data.feed.links.find(link => linkId === link.id);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.feed.links;

          return linksToRender.map((link, i) => (
            <Link
              key={link.id}
              link={link}
              index={i}
              updateStoreAfterVote={this._updateCacheAfterVote}
            />
          ));
        }}
      </Query>
    );
  }
}
export default LinkList;

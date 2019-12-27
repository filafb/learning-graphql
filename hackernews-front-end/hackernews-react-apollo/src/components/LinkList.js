import React, { Component } from 'react';
import Link from './Link';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`;

class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.feed.links;

          return linksToRender.map(link => <Link key={link.id} link={link} />);
        }}
      </Query>
    );
  }
}
export default LinkList;

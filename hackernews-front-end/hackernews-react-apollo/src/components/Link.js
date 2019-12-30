import React, { Component } from 'react';
import { AUTH_TOKEN } from './constants';
import { timeDifferenceForDate } from '../utils';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkID: ID!) {
    vote(linkId: $linkID) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              update={(store, { data }) => {
                console.log('store:', store);
                console.log('data', data);
                return this.props.updateStoreAfterVote(
                  store,
                  data.vote,
                  this.props.link.id
                );
              }}
              variables={{ linkID: this.props.link.id }}
            >
              {voteMutation => (
                <div className="ml1 gray f11 pointer" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;

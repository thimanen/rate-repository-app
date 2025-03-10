import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          fullName
          name
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
          id
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ownerAvatarUrl
      fullName
      name
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      id
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

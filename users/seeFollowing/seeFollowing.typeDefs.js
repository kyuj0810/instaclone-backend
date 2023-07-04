import { gql } from 'apollo-server';

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
  }
`;

/**
 * cursor based pagination
 * 데이터베이스에 우리가 본 마지막 결과물이 무엇인지 알려줘야 함.
 * 예를들면, 첫 번째로 받은 결과가 이 4개의 원으로 가정하고 마지막 원은 29임.
 * 데이터베이스에 CURSOR:29를 보냄 ('29 이후로 모든 것을 전달해줘' 라고)
 * 하나를 skip해야, 29를 반복하지 않게 됨.
 EX)
 * 3 / 10 / 19 / 20 / 32 / 45 / 49 / 52 / 70/ 71 / 73 ...
 * ----TAKE : 4----   --SKIP:1/TAKE:4--
 * 
 * [장점]
 * -규모가 용이하게 커질 수 있다.
 * -무제한 스크롤 페이지가 필요할 때 가장 좋다.
 * 
 * [단점]
 * -특정 페이지로 바로 이동하는 것은 어렵다.
 */

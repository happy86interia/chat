import styled from 'styled-components';
import { palette } from '../palette';

export const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: center;

  .card {
    width: 30rem;
    margin-top: 2em;

    .buttonWrapper {
      display: flex;
      justify-content: flex-end;


      .startButton > div {
        background: ${palette.blue0};
        color: ${palette.white};

        &:hover {
          background: ${palette.blue1};
        }
      }
    }
  }
`;

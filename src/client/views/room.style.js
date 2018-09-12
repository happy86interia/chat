import styled from 'styled-components';
import { palette } from '../palette';

export const RoomWrapper = styled.div`
  display: flex;
  justify-content: center;

  .contentWrapper {
    width: 80vw;
    display: flex;
    margin-top: 2em;

    .button > div {
      background: ${palette.blue0};
      color: ${palette.white};

      &:hover {
        background: ${palette.blue1};
      }
    }

    .leftSide {
      width: 18em;

      > h3 {
        color: ${palette.blue2};
      }

      .roomWrapper {
        display: flex;
        padding: .5em .5em .1em .5em;

        .roomInput {
          flex: 1;
        }

        .roomButton {
          width: 6em;
          display: flex;
          justify-content: flex-end;
        }
      }

      .roomsListWrapper {
        display: flex;
        flex-direction: column;

        .roomItem {
          background: ${palette.white};
          word-break: break-word;
        }
      }
    }

    .rightContent {
      flex: 1;
      min-height: 80vm;
      margin-left: 1em;

      .massagesWrapper {
        flex: 1;
      }

      .addMassagesWrapper {
        display: flex;

        .addMassagesInput {
          flex: 1;
        }

        .addMassagesButton {
          width: 5em;
        }
      }
    }
  }
`;
